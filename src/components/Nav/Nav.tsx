import * as React from "react";
import gsap from "gsap";
import { Stack } from "../Primitives/Stack";
import { Container } from "../Primitives/Container";
import { Box } from "../Primitives/Box";
import { NavMenuMobile, NavPopoverMenu } from "./NavPopoverMenu";
import { Button } from "../Primitives/Button";
import { Media } from "../MediaQuery";
import { AshbyLogo } from "../Primitives/AshbyLogo";
import { NextLink } from "../NextLink";
import { theme } from "../../styles/stitches.config";

export const Nav = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [scrolledPastCTA, setScrolledPastCTA] = React.useState(false);

  React.useEffect(() => {
    const tween = gsap.to("#site-header", {
      borderBottom: `1px solid ${theme.colors.borderMuted}`,
      scrollTrigger: {
        trigger: "body",
        start: "400px 0%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          setScrolledPastCTA(true);
        },
        onLeaveBack: () => {
          setScrolledPastCTA(false);
        },
      },
      ease: "power2.inOut",
      duration: 0.1,
    });

    tween?.scrollTrigger?.refresh();

    return () => {
      tween?.scrollTrigger?.kill();
    };
  }, []);

  return (
    <Box
      id="site-header"
      as="header"
      ref={ref}
      css={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        background: "$primary1",
        zIndex: 10,
        height: "$headerHeight",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container>
        <Stack.H
          align="center"
          justify={{
            "@desktopAndDown": "between",
          }}
          css={{ width: "100%" }}
          spacing="6"
        >
          <NextLink href="/">
            <AshbyLogo aria-label="Navigate home" />
          </NextLink>
          <Media greaterThanOrEqual="desktop" css={{ flex: 1 }}>
            <Stack.H align="center">
              <NavPopoverMenu />
            </Stack.H>
          </Media>
          <Stack.H align="center" spacing="6">
            <Stack.H spacing="2">
              <Box as="a" href="https://app.ashbyhq.com/signin">
                <Button appearance="minimal" size="3">
                  Login
                </Button>
              </Box>
              <NextLink href="/request-demo" perserveParams>
                <Button appearance={scrolledPastCTA ? "primary" : "default"} size="3">
                  Get In Touch
                </Button>
              </NextLink>
            </Stack.H>
            <Media lessThan="desktop" style={{ display: "inline-flex" }}>
              <NavMenuMobile />
            </Media>
          </Stack.H>
        </Stack.H>
      </Container>
    </Box>
  );
});
