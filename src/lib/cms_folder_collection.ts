import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import matter from "gray-matter";
import { CustomerProfile } from "./customer_profile";
import camelCase from "just-camel-case";
import { CustomerQuote } from "./customer_quotes";

const CMS_CONFIG_PATH = "public/admin/config.yml";

enum FolderCollection {
  CustomerProfile = "customer_profiles",
  CustomerChampion = "customer_champions",
  CustomerQuote = "customer_quotes",
}

// TODO: Fully type this out
type CmsConfig = {
  media_folder: string;
  public_folder: string;
  publish_mode: string;
  site_url: string;
  logo_url: string;
  collections: CmsFolder[];
};

// TODO: Fully type this out
type CmsFolder = {
  name: string;
  folder: string;
  format: "yaml" | "frontmatter";
  fields: CmsField[];
};

type CmsField = {
  name: string;
  label: string;
  widget: string;
  multiple?: boolean;
} & {
  widget: "relation";
  collection: string;
};

type CmsRelation = {
  collection: string;
  fieldName: string;
  isMulti: boolean;
};

interface SluggedEntry {
  slug: string;
}

export class CmsFolderCollection<T extends SluggedEntry> {
  collectionName: string;
  configPath: string;
  config: CmsConfig;
  collection: CmsFolder;
  collectionCache: Map<string, any>;
  collectionRelations: CmsRelation[];
  /**
   * Called when building the entry map. Can be used to transform the YAML data into typed data
   */
  transform: ((data: { [K: string]: any }) => T) | undefined;

  constructor({
    collection,
    // Will only load the provided slug or slugs, otherwise loads everything
    includeSlugs,
    transform,
  }: {
    collection: string;
    includeSlugs?: string | string[];
    transform?: (data: { [K: string]: any }) => T;
  }) {
    this.collectionName = collection;
    this.configPath = path.join(process.cwd(), CMS_CONFIG_PATH);
    this.config = this.loadConfig();
    this.collection = this.loadCollectionDirectory();
    this.collectionRelations = this.getRelatedCollectionNames();
    this.transform = transform ?? undefined;

    // This depends on a lot of things. Load this last.
    this.collectionCache = this.buildCollectionEntryMap(includeSlugs);
  }

  /**
   * Unless a custom tranform is set on the class, these will always be called regardless of depth
   */
  defaultTransformByCollection = {
    [FolderCollection.CustomerProfile]: (data: { [K: string]: any }): CustomerProfile => {
      data.product =
        data.product === "all_in_one"
          ? "Ashby All-In-One"
          : data.product === "analytics"
            ? "Ashby Analytics"
            : null;

      return Object.entries(data).reduce((transformedData, [key, value]) => {
        transformedData[camelCase(key)] = value;

        return transformedData;
      }, {} as CustomerProfile);
    },

    [FolderCollection.CustomerQuote]: (data: { [K: string]: any }): CustomerQuote => {
      return Object.entries(data).reduce((transformedData, [key, value]) => {
        transformedData[camelCase(key)] = value;

        return transformedData;
      }, {} as CustomerQuote);
    },
    // Add more default transforms here
  };

  /**
   * Loads up the full CMS config
   */
  private loadConfig() {
    const fileContents = fs.readFileSync(this.configPath, "utf8");
    return yaml.load(fileContents, { schema: yaml.JSON_SCHEMA }) as CmsConfig;
  }

  /**
   * Pulls out the collection for this instance
   */
  private loadCollectionDirectory() {
    const collectionConfig = this.config.collections.find((config) => {
      if (typeof config.name === "string") {
        return config.name === this.collectionName;
      }
      return false;
    });

    if (collectionConfig == null) {
      throw new Error(`Cannot find config for ${this.collectionName}!`);
    }

    return collectionConfig;
  }

  /**
   * Get the name of any related collections we need to load
   */
  getRelatedCollectionNames() {
    return this.collection.fields.reduce((related, field) => {
      if (field.widget === "relation") {
        related.push({
          collection: field.collection,
          fieldName: field.name,
          isMulti: field?.multiple ?? false,
        });
      }

      return related;
    }, [] as CmsRelation[]);
  }

  /**
   * Loads up all the entries in the folder
   */
  private buildCollectionEntryMap(includeSlugs: string | string[]) {
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

    let data: { [K: string]: any };
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

        data[relatedCollection.fieldName] = new CmsFolderCollection({
          collection: relatedCollection.collection,
          // only load the entry or entries related to this entry
          includeSlugs: data[relatedCollection.fieldName],
        });
      });
    }

    return data;
  }

  private applyTransformation(entry: any): T {
    return this.transform
      ? this.transform(entry)
      : this.defaultTransformByCollection[this.collectionName]
        ? this.defaultTransformByCollection[this.collectionName](entry)
        : // If we're not transforming, we can assume the data loaded matches the type
          (entry as T);
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

  /**
   * Recursively load related collections
   */
  loadRelatedCollections(entry: T) {
    this.collectionRelations.forEach((relation) => {
      if (entry[relation.fieldName] instanceof CmsFolderCollection) {
        entry[relation.fieldName] = entry[relation.fieldName].getCollection();

        // Unless multiple is set on the field config, we can assume there's only one relation
        if (!relation.isMulti) {
          entry[relation.fieldName] = entry[relation.fieldName][0];
        }
      }
    });
  }
}
