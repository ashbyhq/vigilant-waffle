import config from "../../lib/config";
import Head from "next/head";

type TwitterCardMetaProps = {
  authorTwitterAccount?: string;
};

export function TwitterCardMeta({ authorTwitterAccount }: TwitterCardMetaProps) {
  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={config.twitter_account} />
      {authorTwitterAccount ? (
        <meta property="twitter:creator" content={authorTwitterAccount} />
      ) : (
        ""
      )}
    </Head>
  );
}
