import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CSS } from "@stitches/react";
import { Section, Container } from "./Primitives/Container";
import { NextLink } from "./NextLink";
import { Box } from "./Primitives/Box";
import { GradientBackground, PatternBackground } from "./Primitives/GradientBackground";
import { Grid } from "./Primitives/Grid";
import { Heading } from "./Primitives/Heading";
import { Link } from "./Primitives/Link";
import { Stack } from "./Primitives/Stack";
import { Paragraph } from "./Primitives/Text";

// *----------------- HiringExcellence -----------------*

const productPrinciples = [
  "Be <b>easy</b> to get started with, <b>powerful</b> when you're ready",
  "Enable <b>structured hiring</b> end-to-end",
  "<b>Automate</b> with a human touch",
  "Provide instant <b>visibility</b> and <b>reduce clicks</b>",
  "Enable <b>custom reporting</b> to unlock real insights",
  "Offer <b>one integrated system</b> for your entire hiring process",
];

interface HiringResultData {
  text: string;
  x: number;
  scale: number;
}

const hiringResults: HiringResultData[] = [
  { text: "Improved candidate experience", x: 100, scale: 1.1 },
  { text: "More accurate and fair candidate assessments", x: 10, scale: 0.9 },
  { text: "Hiring team productivity", x: 120, scale: 1.2 },
  {
    text: "Continuous improvement through data feedback loops",
    x: -20,
    scale: 0.8,
  },
  { text: "Visibility for the entire hiring team", x: 20, scale: 1.2 },
  { text: "Stronger, more diverse candidate pipelines", x: 90, scale: 0.95 },
];

export const HiringExcellence = ({ inStory }: { inStory?: boolean }) => {
  return (
    <Box css={inStory ? { maxWidth: "100vw" } : {}}>
      <Section size="2" css={{ position: "relative" }}>
        <GradientBackground color="primaryToPink" intensity="low" position="left">
          <PatternBackground />
        </GradientBackground>
        <Container
          size={"card"}
          css={{
            isolation: "isolate",
            background: "$white",
            padding: "clamp($6, 5vw, 72px)",
            borderRadius: "$4",
            boxShadow: "0px 0px 1px rgb(20 20 21 / 12%), 0px 2px 36px -25px rgb(14 14 40 / 20%)",
            "@tablet": {
              borderRadius: 0,
            },
          }}
        >
          <Stack.V>
            <Stack.V spacing="4">
              {!inStory && <Heading size="4">Why Ashby?</Heading>}
              <Heading size="8" css={{ ta: "left !important" }}>
                How Ashby enables hiring excellence
              </Heading>
              <Paragraph>
                Hiring has changed and so should your tools. Companies that excel at hiring have a
                strategic advantage. Our approach to building Ashby centers around ambitious teams
                that question the status quo:
              </Paragraph>
            </Stack.V>
            <Box
              css={
                inStory
                  ? {}
                  : {
                      maxHeight: "18rem",
                      overflow: "hidden",
                      maskImage: `linear-gradient(white, transparent)`,
                    }
              }
            >
              <Grid
                spacing="8"
                css={{
                  gridTemplateColumns: "1fr 1fr",
                  gridAutoFlow: "column",
                  "@mobile": {
                    gridTemplateColumns: "1fr",
                    gridTemplateRows: "min-content min-content",
                  },
                }}
              >
                <Stack.V align="start">
                  <Heading as="h3" size="4">
                    We've designed Ashby to:
                  </Heading>
                  <Stack.H>
                    {productPrinciples.map((productPrinciple, index) => (
                      <ProductPrinciple text={productPrinciple} key={index} />
                    ))}
                  </Stack.H>
                </Stack.V>
                <Stack.V align="start">
                  <Heading as="h3" size="4">
                    To help you achieve:
                  </Heading>
                  <Stack.H>
                    {hiringResults.map((hiringResult, index) => (
                      <HiringResult {...hiringResult} key={index} />
                    ))}
                  </Stack.H>
                </Stack.V>
              </Grid>
            </Box>
            {!inStory && (
              <Box
                css={{
                  ta: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <NextLink href="/story" asChild>
                  <Link color="primary" size="3" spacing="4" iconAfter={ArrowRightIcon}>
                    Read Our Story
                  </Link>
                </NextLink>
              </Box>
            )}
          </Stack.V>
        </Container>
      </Section>
    </Box>
  );
};

const excellence: CSS = {
  py: "$2",
  px: "$4",
  borderRadius: "$1",
};

const ProductPrinciple = ({ text }: { text }) => {
  return (
    <Paragraph
      css={{
        ...excellence,
        background: "$primary4",
        color: "$primary13",
        "&:nth-of-type(even)": {
          color: "$orange12",
          background: "$orange4",
        },
        b: {
          fontWeight: "$heading",
        },
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

const HiringResult = ({ text, x, scale }: HiringResultData) => {
  return (
    <Paragraph
      css={{
        ...excellence,
        background: "$pink4",
        color: "$pink12",
        fontWeight: "$medium",

        "@desktopAndUp": {
          transform: `translateX(${x}px) scale(${scale})`,
        },
      }}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
