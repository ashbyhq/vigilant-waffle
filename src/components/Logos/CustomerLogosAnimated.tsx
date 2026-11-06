import * as React from "react";
import { Heading } from "../Primitives/Heading";
import { StyledCustomerLogo } from "./CustomerLogo";
import { Tween } from "react-gsap";
import { Paragraph } from "../Primitives/Text";
import { Stack } from "../Primitives/Stack";
import { Grid } from "../Primitives/Grid";
import { Box } from "../Primitives/Box";
import { ChildrenProps } from "../../utils/props";
import { useCustomerProfiles } from "../Customers/CustomerProfileContext";

interface CustomerLogosAnimatedProps {
  appearance?: "muted" | "default";
  spacing?: "small" | "default";
  showHeader?: boolean;
}

export const CustomerLogosAnimated = ({
  appearance = "muted",
  spacing = "default",
  showHeader = true,
}: CustomerLogosAnimatedProps) => {
  const [isGrayScale, setIsGrayScale] = React.useState(false);
  const gridSpacing = spacing === "default" ? "8" : "7";
  const logoSize = spacing === "default" ? "3" : "1";

  const customerProfiles = useCustomerProfiles();

  const analytics = analyticsLogos.map((logo) => {
    const profile = customerProfiles.find((profile) => profile.slug === logo);
    return {
      src: profile.logo,
      alt: profile.name,
    };
  });
  const allInOne = allInOneLogos.map((logo) => {
    const profile = customerProfiles.find((profile) => profile.slug === logo);
    return {
      src: profile.logo,
      alt: profile.name,
    };
  });

  return (
    <Stack.V
      spacing="6"
      css={{
        "&:hover": {
          ".logosGrid": {
            filter: "grayscale(0)",
          },
        },
      }}
    >
      {showHeader && (
        <Tween position="middle+=0.2" from={{ autoAlpha: 0, opacity: 0 }}>
          <Heading as="h6" size="1" color="muted">
            Loved By Teams At
          </Heading>
        </Tween>
      )}
      <Stack.H justify="between" spacing={{ "@initial": "8", "@mobile": "3" }}>
        <Stack.V spacing="5" css={{ flex: 1 }} justify="between">
          <LogosGrid isGrayScale={isGrayScale} gridSpacing={gridSpacing}>
            <Tween
              from={{ autoAlpha: 0, scale: 0.9 }}
              duration={1}
              position="middle+=0.2"
              stagger={{ from: "end", amount: 0.5, grid: [2, 3] }}
            >
              {analytics.map((logo, index) => (
                <Box
                  key={index}
                  css={{
                    display: "flex",
                    visibility: "hidden",
                  }}
                >
                  <StyledCustomerLogo
                    {...logo}
                    src={logo.src}
                    size={logoSize}
                    css={{
                      maxWidth: "100%",
                      "@mobile": {
                        maxWidth: 90,
                      },
                    }}
                  />
                </Box>
              ))}
            </Tween>
          </LogosGrid>
          <Tween position="middle+=0.2" from={{ autoAlpha: 0 }}>
            <Paragraph size="1" color="muted" css={{ visibility: "hidden" }}>
              — Ashby Analytics
            </Paragraph>
          </Tween>
        </Stack.V>
        <Stack.V spacing="5" css={{ flex: 2.2, "@tablet": { flex: 1.5 } }} justify="between">
          <LogosGrid isGrayScale={isGrayScale} gridSpacing={gridSpacing}>
            <Tween
              from={{
                autoAlpha: 0,
                scale: 0.9,
                onComplete: () => appearance === "muted" && setIsGrayScale(true),
              }}
              duration={1}
              position="middle+=0.2"
              stagger={{ from: "start", amount: 0.5, grid: [2, 6] }}
            >
              {allInOne.map((logo, index) => (
                <Box
                  key={index}
                  css={{
                    display: "flex",
                    visibility: "hidden",
                  }}
                >
                  <StyledCustomerLogo
                    {...logo}
                    src={logo.src}
                    size={logoSize}
                    css={{
                      maxWidth: "100%",
                      "@mobile": {
                        maxWidth: 90,
                      },
                    }}
                  />
                </Box>
              ))}
            </Tween>
          </LogosGrid>
          <Tween position="middle+=0.2" from={{ autoAlpha: 0 }}>
            <Paragraph size="1" color="muted" css={{ visibility: "hidden" }}>
              — Ashby All-in-one
            </Paragraph>
          </Tween>
        </Stack.V>
      </Stack.H>
    </Stack.V>
  );
};

interface LogosGridProps extends ChildrenProps {
  isGrayScale: boolean;
  gridSpacing: "8" | "7";
}

const LogosGrid = ({ children, isGrayScale, gridSpacing }: LogosGridProps) => (
  <Grid
    spacing={{ "@initial": gridSpacing, "@mobile": "6" }}
    className="logosGrid"
    css={{
      $$itemWidth: gridSpacing === "8" ? "80px" : "70px",
      filter: isGrayScale ? "grayscale(1)" : "grayscale(0)",
      transition: "all 200ms ease-out",
      alignItems: "center",

      "@desktopAndDown": {
        columnGap: "$8",
      },
      "@mobile": {
        $$itemWidth: "60px",
      },
    }}
  >
    {children}
  </Grid>
);

/**
 * Lists of slugs from a CustomerProfile
 */

const analyticsLogos = ["notion", "duolingo", "retool", "verkada", "deliveroo", "sequoia"];

const allInOneLogos = [
  "replit",
  "deel",
  "docker",
  "vanmoof",
  "census",
  "ramp",
  "quora",
  "linear",
  "fullstory",
  "ironclad",
  "multiverse",
  "monte-carlo",
];
