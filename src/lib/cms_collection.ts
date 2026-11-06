import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import matter from "gray-matter";
import camelCase from "just-camel-case";

const CMS_CONFIG_PATH = "public/admin/config.yml";

export enum FolderCollection {
  CustomerProfile = "customer_profiles",
  CustomerChampion = "customer_champions",
  CustomerQuote = "customer_quotes",
  Employee = "employees",
  Post = "posts",
}

enum FileCollection {
  Meta = "meta",
  FAQ = "faq",
}

/**
 * To prevent circular refrences, something may not be able to be eager loaded
 */
const DO_NOT_EAGER_LOAD: Array<FolderCollection | FileCollection> = [FileCollection.Meta];

type CmsData = { [K: string]: any };

type BackendConfig = {
  name: string;
  branch: string;
  squash_merges: boolean;
};

type CmsConfig = {
  backend: BackendConfig;
  media_folder: string;
  public_folder: string;
  publish_mode: string;
  site_url: string;
  logo_url: string;
  collections: Array<CmsFolder | CmsFile>;
};

// TODO: Fully type this out
type CmsFolder = {
  name: string;
  folder: string;
  format: "yaml" | "frontmatter";
  fields: CmsField[];
};

type CmsFile = {
  name: string;
  files: Array<{
    name: string;
    file: string;
    fields: CmsField[];
  }>;
};

type CmsField = {
  name: string;
  label: string;
  widget: string;
  multiple?: boolean;
} & (
  | {
      widget: "relation";
      collection: FolderCollection | FileCollection;
      file?: string;
    }
  | {
      widget: "list";
      name: string;
      fields: CmsField[];
    }
);

type CmsRelation = {
  collection: FolderCollection | FileCollection;
  fieldName: string;
  isMulti: boolean;
  type: "file" | "folder";
  file?: string;
};

interface SluggedEntry {
  slug: string;
}

abstract class CmsCollection<T extends SluggedEntry> {
  collectionName: FolderCollection | FileCollection;

  // Where the CMS config lives
  configPath: string;

  // The full CMS config
  config: CmsConfig;

  // A collection with the config
  collection: CmsFile | CmsFolder;

  // A holding place for the data loaded from content files
  collectionCache: Map<string, CmsData>;

  // A list of all relations from current instance to other instances
  collectionRelations: CmsRelation[];

  // How to transform data saved in CMS files into T
  defaultTransformByCollection: {
    [key in FolderCollection | FileCollection]?: (data: { [K: string]: any }) => T;
  };

  /**
   * Called when building the entry map. Can be used to transform the YAML data into typed data
   */
  transform: ((data: CmsData) => T) | undefined;

  constructor({ collection }: { collection: FolderCollection | FileCollection }) {
    this.collectionName = collection;
    this.configPath = path.join(process.cwd(), CMS_CONFIG_PATH);
    this.config = this.loadConfig();
  }

  // Two methods exposed in bot FileLoader and FolderLoader. Used to get transformed and loaded data out of a class
  abstract loadCollectionData(): CmsFolder | CmsFile;
  abstract buildCollectionEntryMap(slugs: string | string[]): Map<string, CmsData>;

  private loadConfig() {
    const fileContents = fs.readFileSync(this.configPath, "utf8");
    return yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as CmsConfig;
  }

  isFolderCollection(collection): collection is CmsFolder {
    return (collection as CmsFolder)?.folder !== undefined;
  }

  // Build a list of collections related to this one.
  // CAUTION: THIS MIGHT GET YOU INTO TROUBLE IF THERE ARE CIRCULAR RELATIONSHIPS!
  buildRelationshipList(fields: CmsField[]) {
    const determineType = (collectionName: string) => {
      const relatedCollection = this.config.collections.find(
        (collection) => collection.name === collectionName,
      );

      if (this.isFolderCollection(relatedCollection)) {
        return "folder";
      }
      return "file";
    };

    return fields.reduce((related, field) => {
      if (DO_NOT_EAGER_LOAD.includes(this.collectionName)) {
        return related;
      }

      if (field.widget === "list") {
        related.push(...this.buildRelationshipList(field.fields));
      }

      if (field.widget === "relation") {
        related.push({
          collection: field.collection,
          fieldName: field.name,
          isMulti: field?.multiple ?? false,
          type: determineType(field.collection),
          file: field?.file,
        });
      }

      return related;
    }, [] as CmsRelation[]);
  }

  applyTransformation(entry: CmsData): T {
    return this.transform
      ? this.transform(entry)
      : this.defaultTransformByCollection?.[this.collectionName]
        ? this.defaultTransformByCollection[this.collectionName](entry)
        : // If we're not transforming, we can assume the data loaded matches the type
          (entry as T);
  }

  transformToCamelCase(data: CmsData) {
    return Object.entries(data).reduce((transformedData, [key, value]) => {
      transformedData[camelCase(key)] = value;

      return transformedData;
    }, {} as T);
  }

  /**
   * Recursively load related collections
   */
  loadRelatedCollections(entry: CmsData) {
    this.collectionRelations.forEach((relation) => {
      if (
        entry[relation.fieldName] instanceof CmsFolderCollection ||
        entry[relation.fieldName] instanceof CmsFileCollection
      ) {
        entry[relation.fieldName] = entry[relation.fieldName].getCollection();

        // Unless multiple is set on the field config, we can assume there's only one relation
        if (!relation.isMulti) {
          entry[relation.fieldName] = entry[relation.fieldName][0];
        }
      }
    });
  }
}

class CmsFileCollection<T extends SluggedEntry> extends CmsCollection<T> {
  declare collection: CmsFile;
  fileName: string;
  collectionFileConfig: CmsFile["files"][number];

  constructor({
    collection,
    // Will only load the provided slug or slugs, otherwise loads everything
    includeSlugs,
    fileName,
    /**
     * Called when building the entry map. Can be used to transform the YAML data into typed data
     */
    transform,
  }: {
    collection: FolderCollection | FileCollection;
    includeSlugs?: string | string[];
    fileName: string;
    transform?: (data: CmsData) => T;
  }) {
    super({ collection });
    this.transform = transform;
    this.collection = this.loadCollectionData();
    this.fileName = fileName;
    this.collectionFileConfig = this.collection.files.find((file) => file.name === this.fileName);

    this.collectionRelations = this.findCollectionRelations();

    // This depends on a lot of things. Load this last.
    this.collectionCache = this.buildCollectionEntryMap(includeSlugs);
  }

  /**
   * Pulls out the collection for this instance
   */
  loadCollectionData(): CmsFile {
    const collectionConfig = this.config.collections.find((config) => {
      if (typeof config.name === "string") {
        return config.name === this.collectionName;
      }
      return false;
    });

    if (collectionConfig == null) {
      throw new Error(`Cannot find config for ${this.collectionName}!`);
    }
    if (this.isFolderCollection(collectionConfig)) {
      throw new Error("Folder collections cannot be part of a CmsFileCollection");
    }

    return collectionConfig;
  }

  /**
   * Builds a map of all of every entry in the collection. Eager loads relations as sub-collections
   */
  buildCollectionEntryMap(slugs?: string | string[]) {
    const collectionConfig = this.collection.files.find((file) => file.name === this.fileName);

    const collectionData = fs.readFileSync(collectionConfig.file, "utf8");
    const data = yaml.load(collectionData, {
      schema: yaml.JSON_SCHEMA,
    });

    const filteredData = data[this.fileName].filter((value) => {
      if (typeof slugs === "string") {
        return value.slug === slugs;
      }
      if (typeof slugs === "object") {
        return slugs.includes(value.slug);
      }

      return true;
    });

    // Instantiate related collections
    if (this.collectionRelations.length > 0) {
      this.collectionRelations.forEach((relatedCollection) => {
        data[this.fileName] = data[this.fileName].map((entry) => {
          if (relatedCollection.type === "folder") {
            entry[relatedCollection.fieldName] = new CmsFolderCollection({
              collection: relatedCollection.collection,
              // only load the entry or entries related to this entry
              includeSlugs: entry[relatedCollection.fieldName],
            });
          }

          if (relatedCollection.type === "file") {
            entry[relatedCollection.fieldName] = new CmsFileCollection({
              collection: relatedCollection.collection,
              fileName: relatedCollection.file,
              // only load the entry or entries related to this entry
              includeSlugs: entry[this.fileName][relatedCollection.fieldName],
            });
          }

          return entry;
        });
      });
    }

    this.collectionCache = new Map(filteredData.map((entry) => [entry.slug, entry]));

    return this.collectionCache;
  }

  /**
   * Get the name of any related collections we need to load
   */
  findCollectionRelations() {
    return this.buildRelationshipList(this.collectionFileConfig.fields);
  }

  /**
   * Build an array of data from the internal map. Apply transformation to match T
   */
  getCollection() {
    const collectionClone = Array.from(this.collectionCache.values());

    collectionClone.forEach((entry) => {
      this.loadRelatedCollections(entry);
    });

    const transformedData = collectionClone.map<T>((entry) => {
      return this.applyTransformation(entry);
    });

    return transformedData;
  }

  /**
   * Get, transform and return a single entry from the map
   */
  getCollectionItem(slug: string) {
    const item = this.collectionCache.get(slug);
    return this.applyTransformation(item);
  }
}

export class CmsFolderCollection<T extends SluggedEntry> extends CmsCollection<T> {
  declare collection: CmsFolder;

  constructor({
    collection,
    // Will only load the provided slug or slugs, otherwise loads everything
    includeSlugs,
    transform,
  }: {
    collection: FolderCollection | FileCollection;
    includeSlugs?: string | string[];
    transform?: (data: CmsData) => T;
  }) {
    super({ collection });
    this.collectionName = collection;
    // this.configPath = path.join(process.cwd(), CMS_CONFIG_PATH);
    this.collection = this.loadCollectionData();
    this.collectionRelations = this.findCollectionRelations();
    this.transform = transform ?? undefined;

    // This depends on a lot of things. Load this last.
    this.collectionCache = this.buildCollectionEntryMap(includeSlugs);

    // Define how to transform a CMS collection into T
    this.defaultTransformByCollection = {
      [FolderCollection.CustomerProfile]: (data: CmsData): T => {
        data.product =
          data.product === "all_in_one"
            ? "Ashby All-In-One"
            : data.product === "analytics"
              ? "Ashby Analytics"
              : null;

        return this.transformToCamelCase(data);
      },

      [FolderCollection.CustomerQuote]: (data: CmsData): T => {
        return this.transformToCamelCase(data);
      },

      [FolderCollection.Employee]: (data: CmsData): T => {
        return this.transformToCamelCase(data);
      },

      [FolderCollection.Post]: (data: CmsData): T => {
        data.hero_image = data.hero_image || null;
        data.changelog = data.changelog || [];
        data.authors = data.authors || null;

        return this.transformToCamelCase(data);
      },
      // Add more default transforms here
    };
  }

  /**
   * Pulls out the collection for this instance
   */
  loadCollectionData(): CmsFolder {
    const collectionConfig = this.config.collections.find((config) => {
      if (typeof config.name === "string") {
        return config.name === this.collectionName;
      }
      return false;
    });

    if (collectionConfig == null) {
      throw new Error(`Cannot find config for ${this.collectionName}!`);
    }
    if (!this.isFolderCollection(collectionConfig)) {
      throw new Error("File collections cannot be part of a CmsFolderCollection");
    }

    return collectionConfig;
  }

  /**
   * Get the name of any related collections we need to load
   */
  findCollectionRelations() {
    return this.buildRelationshipList(this.collection.fields);
  }

  /**
   * Loads up all the entries in the folder
   */
  buildCollectionEntryMap(includeSlugs: string | string[]) {
    if (this.collectionCache && process.env.CONTEXT != null) {
      return this.collectionCache;
    }

    const fileNames = fs.readdirSync(this.collection.folder);

    const collectionFileExtension = this.collection.format === "frontmatter" ? ".mdx" : ".yml";

    const collectionData = fileNames
      .filter((fileName) => {
        fileName = fileName.replace(`${collectionFileExtension}`, "");
        if (typeof includeSlugs === "string") {
          return fileName === includeSlugs;
        }
        if (typeof includeSlugs === "object") {
          return includeSlugs.includes(fileName);
        }
        return true;
      })
      .map((fileName) => {
        return this.loadDataFromFile(fileName);
      });

    this.collectionCache = new Map(collectionData.map((data) => [data.slug, data]));

    return this.collectionCache;
  }

  private loadDataFromFile(fileName: string) {
    const fullPath = path.join(this.collection.folder, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    let data: CmsData;
    switch (this.collection.format) {
      case "yaml":
        data = yaml.load(fileContents, {
          schema: yaml.JSON_SCHEMA,
        }) as T;
        break;

      case "frontmatter":
        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents, {
          engines: {
            yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as any,
          },
        });

        data = matterResult.data;
        data.content = matterResult.content;

        break;

      default:
        throw new Error("Unsupported collection format");
    }

    if (typeof data !== "object") {
      throw new Error("Bad data");
    }

    // Instantiate related collections
    if (this.collectionRelations.length > 0) {
      this.collectionRelations.forEach((relatedCollection) => {
        if (data[relatedCollection.fieldName] == null) {
          return;
        }
        if (relatedCollection.type === "folder") {
          data[relatedCollection.fieldName] = new CmsFolderCollection({
            collection: relatedCollection.collection,
            // only load the entry or entries related to this entry
            includeSlugs: data[relatedCollection.fieldName],
          });
          return;
        }

        if (relatedCollection.type === "file") {
          data[relatedCollection.fieldName] = new CmsFileCollection({
            collection: relatedCollection.collection,
            fileName: relatedCollection.file,
            // only load the entry or entries related to this entry
            includeSlugs: data[relatedCollection.fieldName],
          });
          return;
        }
      });
    }

    return data;
  }

  getCollection() {
    const collectionClone = Array.from(this.collectionCache.values());

    collectionClone.forEach((entry) => {
      this.loadRelatedCollections(entry);
    });

    const transformedData = collectionClone.map<T>((entry) => {
      return this.applyTransformation(entry);
    });

    return transformedData;
  }

  getCollectionItem(item: string) {
    const itemClone = this.collectionCache.get(item);

    this.loadRelatedCollections(itemClone);

    const transformedData = this.applyTransformation(itemClone);

    return transformedData;
  }
}
