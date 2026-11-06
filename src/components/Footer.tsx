import LinkedInSvg from "../assets/linkedin.svg";
import TwitterSvg from "../assets/twitter.svg";
import { ChildrenProps } from "../utils/props";
import { routes, RouteItem, socialLinks } from "../utils/routes";
import { Container, Section } from "./Primitives/Container";
import { NextImage } from "./NextImage";
import { NextLink } from "./NextLink";
import { AshbyLogo } from "./Primitives/AshbyLogo";
import { Box } from "./Primitives/Box";
import { IconButton } from "./Primitives/Button";
import { Clickable } from "./Primitives/Clickable";
import { Heading } from "./Primitives/Heading";
import { Link } from "./Primitives/Link";
import { Stack } from "./Primitives/Stack";
import { Paragraph } from "./Primitives/Text";
import { productOffering } from "./ProductOffering";
import { G2Logo } from "./G2Logo";
import { styled } from "../styles/stitches.config";

const currentYear = new Date().getFullYear();

export const Footer = () => (
  <Section css={{ borderTop: "1px solid $borderMuted" }} size="2">
    <Container>
      <Stack.H spacing="8">
        <Stack.V
          css={{
            mr: "auto",
            "@tablet": {
              flexDirection: "row",
              width: "100%",
            },
          }}
          justify="between"
        >
          <Stack.V spacing="4">
            <Box>
              <NextLink href="/">
                <AshbyLogo aria-label="Navigate home" />
              </NextLink>
            </Box>
            <Paragraph color="muted" size="2">
              © {currentYear} Ashby, Inc.
            </Paragraph>
            <StyledG2Logo>
              <G2Logo width={79} height={20} displayText={false} />
            </StyledG2Logo>
            <Box css={{ maxWidth: 64 }}>
              <NextImage src="/soc2.png" width={100} height={100} layout="responsive" alt="SoC2" />
            </Box>
          </Stack.V>
          <Stack.H spacing="4">
            {socialLinksList.map((l) => (
              <Link key={l.slug} href={l.slug} isExternal aria-label={l.label}>
                <IconButton size="2" appearance={"minimal"} aria-label={`Navigate to ${l.label}`}>
                  {<l.icon />}
                </IconButton>
              </Link>
            ))}
          </Stack.H>
        </Stack.V>
        <Stack.V spacing="5">
          <Heading size="1" color="muted">
            {footerLinks.product.header}
          </Heading>
          <Stack.V spacing="2">
            <ProductOfferingLinks />
            <ListOfLinks list={footerLinks.product.links} />
          </Stack.V>
        </Stack.V>
        {[footerLinks.resources, footerLinks.company, footerLinks.developers].map((section) => (
          <Stack.V key={section.header} spacing="5">
            <Heading size="1" color="muted">
              {section.header}
            </Heading>
            <Stack.V spacing="2">
              <ListOfLinks list={section.links} />
            </Stack.V>
          </Stack.V>
        ))}
      </Stack.H>
    </Container>
  </Section>
);

const ListOfLinks = ({
  list,
  children,
}: {
  list: RouteItem[];
} & ChildrenProps) => (
  <Stack.V spacing="2">
    {list.map((l) => (
      <FooterLink key={l.slug} slug={l.slug}>
        {l.label}
      </FooterLink>
    ))}
    {children}
  </Stack.V>
);

const FooterLinkText = (props) => (
  <Paragraph
    as="span"
    size="3"
    color="dark"
    css={{ fontWeight: "$medium", display: "inline-block" }}
    {...props}
  />
);

const FooterLink = ({ children, slug }) => (
  <NextLink href={slug}>
    <Clickable css={{ px: "$3", py: "$2", marginLeft: "calc($3 * -1)" }}>
      {typeof children === "string" ? <FooterLinkText>{children}</FooterLinkText> : children}
    </Clickable>
  </NextLink>
);

const ProductOfferingLinks = () => (
  <>
    {productOffering.map((p) => (
      <FooterLink slug={p.slug} key={p.slug}>
        <FooterLinkText>
          {p.product} {p.shortSegment && `• ${p.shortSegment}`}
        </FooterLinkText>
      </FooterLink>
    ))}
  </>
);

const footerLinks: Record<string, { header: string; links: RouteItem[] }> = {
  product: {
    header: "Product",
    links: [routes.customers, routes.pricing, routes.security],
  },
  resources: {
    header: "Resources",
    links: [
      routes.integrations,
      routes.support,
      routes.terms,
      routes.privacy,
      routes.vulnerability,
    ],
  },
  company: {
    header: "Company",
    links: [routes.ashbyStory, routes.blog, routes.careers, routes.team],
  },
  developers: {
    header: "Developers",
    links: [routes.apiDocs, routes.status],
  },
};

const socialLinksList = [
  { ...socialLinks.twitter, icon: TwitterSvg },
  { ...socialLinks.linkedIn, icon: LinkedInSvg },
];

const StyledG2Logo = styled("div", {
  filter: "grayscale(1)",
});
