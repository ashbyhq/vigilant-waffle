import NextImage from "next/image";
import { routes } from "../utils/routes";
import { NextLink } from "./NextLink";
import { Box } from "./Primitives/Box";
import { Heading } from "./Primitives/Heading";
import { Stack } from "./Primitives/Stack";
import { Paragraph } from "./Primitives/Text";

interface ProductIcon {
  iconSrc: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductOfferingContent extends ProductIcon {
  segment: string;
  shortSegment?: string;
  product: string;
  companySize?: string;
  description: string;
  slug: string;
}

const startupsIcon: ProductIcon = {
  iconSrc: "/images/product/startups-icon.svg",
  alt: "Ashby All-In-One for Startups",
  width: 255,
  height: 258,
};

const enterpriseIcon: ProductIcon = {
  iconSrc: "/images/product/enterprise-icon.svg",
  alt: "Ashby All-In-One for Growth and Enterprise",
  width: 255,
  height: 272,
};

const analyticsIcon: ProductIcon = {
  iconSrc: "/images/product/analytics-icon.svg",
  alt: "Ashby Analytics for your existing ATS",
  width: 255,
  height: 244,
};

export const productOffering: ProductOfferingContent[] = [
  {
    segment: "For Startups",
    shortSegment: "Startups",
    product: "Ashby All-in-one",
    companySize: "1–100 employees",
    description:
      "Get a head start on recruiting with an all-in-one product that is easy to use and will scale with you.",
    ...startupsIcon,
    slug: routes.startups.slug,
  },
  {
    segment: "For Growth / Enterprise",
    shortSegment: "Growth / Enterprise",
    product: "Ashby All-in-one",
    companySize: "100+ employees",
    description:
      "A powerful all-in-one recruiting product that will help your scaling organization excel at hiring.",
    ...enterpriseIcon,
    slug: routes.enterprise.slug,
  },
  {
    segment: "For your existing ATS",
    product: "Ashby Analytics",
    description:
      "Advanced recruiting analytics that work on top of your existing recruiting tools.",
    ...analyticsIcon,
    slug: routes.analytics.slug,
  },
];

export const ProductOffering = ({
  product,
  segment,
  description,
  iconSrc,
  alt,
  companySize,
  width,
  height,
  slug,
}: ProductOfferingContent) => (
  <NextLink href={slug} passHref aria-label={`Learn more about ${product} ${segment}`}>
    <Stack.V
      spacing={{
        "@tablet": "4",
        "@desktopAndUp": 5,
      }}
      css={{
        height: "100%",
        borderRadius: "$2",
        p: "$6",
        "&:hover": {
          backgroundColor: "$gray3",
          cursor: "pointer",

          ".illustration-container": {
            transform: "translateY(-5%) scale(1.04)",
          },
        },

        "@tablet": {
          p: "$4",
        },
      }}
    >
      <Box
        className="illustration-container"
        css={{
          transition: "transform 200ms cubic-bezier(0.07, 0.82, 0.57, 1.42) ",
          willChange: "transform",
          height: 220,
          "@tablet": { height: 180 },
          "> *": {
            maxHeight: "100%",
          },
        }}
      >
        <NextImage
          src={iconSrc}
          width={width}
          height={height}
          layout="responsive"
          objectFit="contain"
          priority
          alt={alt}
        />
      </Box>
      <Stack.V spacing="2">
        <Heading size="4">
          <Box css={{ color: "$textMuted" }}>{product}</Box>
          {segment}
        </Heading>
        <Box css={{ minHeight: 18 }}>
          {companySize && (
            <Heading size="1" color="muted">
              {companySize}
            </Heading>
          )}
        </Box>
      </Stack.V>
      <Paragraph size="3" css={{ flex: 1 }}>
        {description}
      </Paragraph>
      <Paragraph as="span" color="primary" size="3">
        Learn more
      </Paragraph>
    </Stack.V>
  </NextLink>
);
