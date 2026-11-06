import Head from "next/head";
import config from "../../lib/config";

type BasicMetaProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  authorNames?: string[];
  url: string;
};
export function BasicMeta({ title, description, keywords, authorNames, url }: BasicMetaProps) {
  return (
    <Head>
      <title>{title ? [title, config.site_title].join(" | ") : config.site_title}</title>
      <meta name="description" content={description ? description : config.site_description} />
      <meta
        name="keywords"
        content={
          keywords ? keywords.join(",") : config.site_keywords.map((it) => it.keyword).join(",")
        }
      />
      {authorNames ? authorNames.map((a) => <meta name="author" content={a} key={a} />) : null}
      <link rel="canonical" href={config.base_url + url} />
    </Head>
  );
}
