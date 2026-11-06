import Head from "next/head";
import config from "../../lib/config";

type OpenGraphMetaProps = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};
export function OpenGraphMeta({ url, title, description, image }: OpenGraphMetaProps) {
  return (
    <Head>
      <meta property="og:site_name" content={config.site_title} />
      <meta property="og:url" content={config.base_url + url} />
      <meta property="og:title" content={title ? [title, config.site_title].join(" | ") : ""} />
      <meta
        property="og:description"
        content={description ? description : config.site_description}
      />
      <meta
        property="og:image"
        content={`${
          `${config.base_url}${image ? image : "/og/default.png"}`
          /** Change the ?v1 to cache bust services like Twitter. It's ok to cache bust all og images. */
        }?v5`}
      />
      <meta property="og:type" content="article" />
    </Head>
  );
}
