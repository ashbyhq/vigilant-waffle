import { CustomerQuote } from "../lib/customer_quotes";
import { NextImage } from "./NextImage";
import { Box } from "./Primitives/Box";
import { Heading } from "./Primitives/Heading";
import { IconBox } from "./Primitives/IconBox";
import { Image } from "./Primitives/Image";
import { Stack } from "./Primitives/Stack";
import { Paragraph } from "./Primitives/Text";

function isCustomerQuote(quote: CustomerQuote): quote is CustomerQuote {
  return (quote as CustomerQuote).slug !== undefined;
}

interface NormalizedQuote {
  text: string;
  author: {
    avatar: string;
    title: string;
    name: string;
  };
  company: {
    logo: string;
    name: string;
  };
}

type QuoteProps = { className?: string } & CustomerQuote;

const normalize = (quote: CustomerQuote): NormalizedQuote => {
  const normalizedQuote = {
    author: {},
    company: {},
  } as NormalizedQuote;

  if (isCustomerQuote(quote)) {
    normalizedQuote.text = quote.quoteText;
    normalizedQuote.author.name = quote.quoteAuthor.name;
    normalizedQuote.author.avatar = quote.quoteAuthor.avatar;
    normalizedQuote.author.title = quote.quoteAuthor.title;
    normalizedQuote.company.name = quote.quoteAuthor.company.name;
    normalizedQuote.company.logo = quote.quoteAuthor.company.logo;
  }

  return normalizedQuote;
};

export const FeaturedQuote = ({ className, ...quote }: QuoteProps) => {
  // This normalized quote will go away once all quotes are read from the CMS
  const normalizedQuote = normalize(quote);

  return (
    <Stack.V className={className} spacing="5" align="center" css={{ ta: "center" }}>
      <IconBox
        size="5"
        appearance={"avatar"}
        css={{ boxShadow: "$elevation1", "> *": { width: "100% !important" } }}
      >
        <NextImage
          src={normalizedQuote.author.avatar}
          width={400}
          height={400}
          layout="responsive"
          alt={`Headshot of ${normalizedQuote.author.name}`}
        />
      </IconBox>
      <Paragraph
        size="5"
        css={{
          maxWidth: 730,
          mx: "auto",
          i: { fontStyle: "normal", color: "$textMuted" },
        }}
        color="dark"
        dangerouslySetInnerHTML={{ __html: `”${normalizedQuote.text}“` }}
      />
      <Stack.V spacing="6">
        <Box>
          <Heading size="3">{normalizedQuote.author.name}</Heading>
          <Heading size="3" color="muted">
            {normalizedQuote.author.title}{" "}
            {normalizedQuote.company ? `at ${normalizedQuote.company.name}` : null}
          </Heading>
        </Box>
        {normalizedQuote.company.logo && (
          <Stack.H justify={"center"}>
            <Image
              title={normalizedQuote.company.name}
              src={normalizedQuote.company.logo}
              alt={`${normalizedQuote.company.name} logo`}
              css={{ height: 24, maxWidth: 180 }}
            />
          </Stack.H>
        )}
      </Stack.V>
    </Stack.V>
  );
};

export const Quote = ({
  size = "default",
  color = "default",
  className,
  ...quote
}: {
  size?: "default" | "small";
  color?: "default" | "heading";
} & QuoteProps) => {
  const normalizedQuote = normalize(quote);

  return (
    <Stack.V className={className} spacing="4">
      <Paragraph size={size === "default" ? "4" : "3"} color={color}>
        ”{normalizedQuote.text}”
      </Paragraph>
      <Stack.H justify={"between"} align="center" spacing="6">
        <Stack.H spacing="4" align="center">
          <IconBox
            size={size === "default" ? "5" : "4"}
            appearance={"avatar"}
            css={{
              boxShadow: "$elevation1",
              "> *": { width: "100% !important" },
            }}
          >
            <NextImage
              src={normalizedQuote.author.avatar}
              width={100}
              height={100}
              layout="responsive"
              alt=""
            />
          </IconBox>
          <Box>
            <Heading size={size === "default" ? "3" : 2}>{normalizedQuote.author.name}</Heading>
            <Heading size={size === "default" ? "3" : 2} color="muted">
              {normalizedQuote.author.title}{" "}
              {normalizedQuote.company ? `at ${normalizedQuote.company.name}` : null}
            </Heading>
          </Box>
        </Stack.H>
        {normalizedQuote.company.logo && (
          <Image
            title={normalizedQuote.company.name}
            src={normalizedQuote.company.logo}
            alt={normalizedQuote.company.name}
            css={{ height: 20 }}
          />
        )}
      </Stack.H>
    </Stack.V>
  );
};
