/* eslint-disable @typescript-eslint/quotes */
import React, { useEffect } from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { CaretDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import HamburgerMenuIcon from "../../assets/hamburger-menu.svg";
import { Heading } from "../Primitives/Heading";
import { ChildrenProps } from "../../utils/props";
import { Stack } from "../Primitives/Stack";
import { IconBox } from "../Primitives/IconBox";
import { Box } from "../Primitives/Box";
import * as Dialog from "@radix-ui/react-dialog";
import { styled, keyframes } from "../../styles/stitches.config";
import { StyledLink } from "../Primitives/Link";
import { productOffering, ProductOfferingContent } from "../ProductOffering";
import { routes } from "../../utils/routes";
import { NextLink } from "../NextLink";
import { NextImage } from "../NextImage";
import { Paragraph } from "../Primitives/Text";

const enterFromRight = keyframes({
  from: { transform: "translateX(200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const enterFromLeft = keyframes({
  from: { transform: "translateX(-200px)", opacity: 0 },
  to: { transform: "translateX(0)", opacity: 1 },
});

const scaleIn = keyframes({
  from: { transform: "rotateX(-15deg) scale(0.9)", opacity: 0 },
  to: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
});

const scaleOut = keyframes({
  from: { transform: "rotateX(0deg) scale(1)", opacity: 1 },
  to: { transform: "rotateX(-20deg) scale(0.95)", opacity: 0 },
});

const StyledMenu = styled(NavigationMenuPrimitive.Root, {
  position: "relative",
  display: "flex",
  width: "100%",
  zIndex: 1,
});

const StyledList = styled(NavigationMenuPrimitive.List, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  li: {
    listStyle: "none",
  },
});

const itemStyles = {
  paddingX: "$3",
  height: 32,
  display: "inline-flex",
  alignItems: "center",
  outline: "none",
  userSelect: "none",
  fontWeight: "$medium",
  borderRadius: "$1",
  fontSize: "$3",
  color: "$textDark",
  "&:focus": { position: "relative", boxShadow: `$focus` },
  "&:hover": { backgroundColor: "$gray3" },
  "&:active, [aria-expanded='true']": { backgroundColor: "$gray4" },
};

const StyledTrigger = styled(NavigationMenuPrimitive.Trigger, {
  all: "unset",
  ...itemStyles,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 2,
});

const StyledNavLink = styled("span", {
  ...itemStyles,
  cursor: "pointer",
});

const StyledCaret = styled(CaretDownIcon, {
  position: "relative",
  color: "$textDefault",
  width: "16px",
  height: "16px",
  "[data-state=open] &": { transform: "rotate(-180deg)" },
  "@media (prefers-reduced-motion: no-preference)": {
    transition: "$microTransform",
  },
});

const MenuStyledLink = styled(NavigationMenuPrimitive.Link, {
  ...itemStyles,
  cursor: "pointer",
  textDecoration: "none",
  display: "block",
});

const StyledContent = styled(NavigationMenuPrimitive.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  "@media only screen and (min-width: 600px)": { width: "auto" },
  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "250ms",
    animationTimingFunction: "ease",
    '&[data-motion="from-start"]': { animationName: enterFromLeft },
    '&[data-motion="from-end"]': { animationName: enterFromRight },
  },
});

const ViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  width: "100%",
  top: "100%",
  perspective: "1200px",
});

const StyledViewport = styled(NavigationMenuPrimitive.Viewport, {
  position: "relative",
  transformOrigin: "top center",
  marginTop: "$3",
  width: "100%",
  backgroundColor: "$white",
  borderRadius: "$2",
  overflow: "hidden",
  boxShadow: "$elevation2",
  height: "var(--radix-navigation-menu-viewport-height)",

  "@media only screen and (min-width: 600px)": {
    width: "var(--radix-navigation-menu-viewport-width)",
  },

  "@media (prefers-reduced-motion: no-preference)": {
    transition: "width, height, 600ms cubic-bezier(0.16, 1, 0.3, 1)",
    '&[data-state="open"]': {
      animation: `${scaleIn} 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${scaleOut} 400ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
  },
});

const StyledTriggerWithCaret = React.forwardRef<HTMLButtonElement, any>(
  ({ children, ...props }, forwardedRef) => (
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledCaret aria-hidden />
    </StyledTrigger>
  ),
);

const NavigationMenu = StyledMenu;
const NavigationMenuList = StyledList;
const NavigationMenuItem = NavigationMenuPrimitive.Item;
const NavigationMenuTrigger = StyledTriggerWithCaret;
const NavigationMenuLink = MenuStyledLink;
const NavigationMenuContent = StyledContent;
const NavigationMenuViewport = StyledViewport;

const ListItem = styled("div", {
  listStyle: "none",
  flex: 1,
});

type ContentListItemProps = ChildrenProps & ProductOfferingContent;

const ContentListItem = React.forwardRef<HTMLAnchorElement, ContentListItemProps>(
  ({ companySize, segment, product, slug, width, height, iconSrc }, forwardedRef) => (
    <ListItem css={{ "> a": { width: "100%" } }}>
      <NextLink href={slug} perserveParams css={{ width: "100%" }}>
        <NavigationMenuLink
          as="span"
          ref={forwardedRef}
          css={{
            padding: "$4",
            height: "auto",
            borderRadius: "$1",
            "&:hover": { backgroundColor: "$gray2" },
          }}
        >
          <Stack.V align="start" spacing="4">
            <Stack.V spacing="2">
              <IconBox
                size="6"
                css={{
                  "> *": {
                    maxHeight: "100%",
                  },
                }}
              >
                <NextImage src={iconSrc} width={width} height={height} layout="fixed" alt="" />
              </IconBox>
              <Box>
                <Heading size="3" color="muted">
                  {product}
                </Heading>
                <Heading size="3">{segment}</Heading>
                <Heading size="1" color="muted">
                  {companySize}
                </Heading>
              </Box>
            </Stack.V>
          </Stack.V>
        </NavigationMenuLink>
      </NextLink>
    </ListItem>
  ),
);

const ProductsList = () => {
  return (
    <Box css={{ p: "$4", minWidth: 450 }}>
      <Stack.V spacing="5">
        <Stack.H
          spacing="4"
          css={{
            "> *": {
              flex: "1 1 200px",
            },
          }}
        >
          {productOffering.map((p) => (
            <ContentListItem key={p.slug} {...p} />
          ))}
          <Box css={{ flex: 1 }} />
        </Stack.H>
      </Stack.V>
    </Box>
  );
};

type HiringListItemProps = ChildrenProps & {
  title: string;
  description: string;
  slug: string;
  count?: number;
};

const HiringListItem = React.forwardRef<HTMLAnchorElement, HiringListItemProps>(
  ({ title, description, slug, count }, forwardedRef) => (
    <ListItem css={{ "> a": { width: "100%" } }}>
      <NextLink href={slug}>
        <NavigationMenuLink
          ref={forwardedRef}
          css={{
            padding: "$4",
            height: "auto",
            borderRadius: "$1",
            "&:hover": { backgroundColor: "$gray2" },
          }}
        >
          <Stack.V align="start" spacing="5">
            <Box>
              <Stack.H spacing="2" align="center">
                <Heading size="3">{title}</Heading>
                {count && (
                  <Box
                    css={{
                      backgroundColor: "$primary4",
                      color: "$primary10",
                      fontSize: "$1",
                      fontWeight: "$heading",
                      px: "$2",
                      borderRadius: "$round",
                    }}
                  >
                    {count}
                  </Box>
                )}
              </Stack.H>
              <Paragraph size="2" dangerouslySetInnerHTML={{ __html: description }} />
            </Box>
          </Stack.V>
        </NavigationMenuLink>
      </NextLink>
    </ListItem>
  ),
);

const WereHiringList = ({ jobCount }: { jobCount: number | undefined }) => {
  return (
    <Box css={{ p: "$4", minWidth: 450 }}>
      <Stack.V spacing="5">
        <Stack.H
          spacing="4"
          css={{
            "> *": {
              flex: "1 1 200px",
            },
          }}
        >
          {/* <HiringListItem
            title="How We Work"
            description="Our operating principles to execute exceptionally at scale"
            slug={routes.team.slug}
          /> */}
          <HiringListItem
            title="Team"
            description="Meet our team and read about their experience at&nbsp;Ashby"
            slug={routes.team.slug}
          />
          <HiringListItem
            title="Careers"
            description="We're hiring in North America and Europe time&nbsp;zones"
            slug={routes.careers.slug}
            count={jobCount}
          />
        </Stack.H>
      </Stack.V>
    </Box>
  );
};

export const NavPopoverMenu = () => {
  const [offset, setOffset] = React.useState<number>();
  const [value, setValue] = React.useState<string>();
  const [jobCount, setJobCount] = React.useState<number>();

  const onNodeUpdate = (trigger, itemValue) => {
    if (trigger && value === itemValue) {
      setOffset(Math.round(trigger.offsetLeft));
    }
  };

  useEffect(() => {
    fetch("https://api.ashbyhq.com/posting-api/job-board/ashby")
      .then(async (res) => res.json())
      .then((data) => {
        setJobCount(data.jobs.filter((j) => j.isListed).length);
      });
  }, []);

  return (
    <NavigationMenu onValueChange={setValue}>
      <Stack.H spacing="4" align="center">
        <NavigationMenuList css={{ gap: "$4" }}>
          <NavigationMenuItem value="Products">
            <NavigationMenuTrigger ref={(node) => onNodeUpdate(node, "Products")}>
              Products
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ProductsList />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem value="Resources">
            <NavigationMenuTrigger ref={(node) => onNodeUpdate(node, "Resources")}>
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <Stack.V spacing="2" css={{ p: "$4", minWidth: 200 }}>
                {resourcesLinks.map((l) => (
                  <NextLink href={l.slug} key={l.slug}>
                    <StyledNavLink color="default" css={{ width: "100%" }}>
                      {l.label}
                    </StyledNavLink>
                  </NextLink>
                ))}
              </Stack.V>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {links.map((l) => (
            <Box as="li" key={l.slug}>
              <NextLink href={l.slug}>
                <StyledNavLink color="default">{l.label}</StyledNavLink>
              </NextLink>
            </Box>
          ))}
          <NavigationMenuItem value="We're Hiring">
            <NavigationMenuTrigger ref={(node) => onNodeUpdate(node, "We're Hiring")}>
              We're Hiring
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <WereHiringList jobCount={jobCount} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </Stack.H>

      <ViewportPosition
        css={{
          transform: `translateX(${offset}px)`,
        }}
      >
        <NavigationMenuViewport />
      </ViewportPosition>
    </NavigationMenu>
  );
};

const RowLink = styled(StyledLink, {
  display: "inline-flex",
  alignItems: "center",
  py: "$4",
});

const enter = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

const exit = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
});

const contentEnter = keyframes({
  "0%": {
    transform: "translateY(20%)",
    opacity: 0,
  },
  "100%": {
    transform: "translateY(0)",
    opacity: 1,
  },
});

const contentExit = keyframes({
  "0%": {
    transform: "translateY(0)",
    opacity: 1,
  },
  "100%": {
    transform: "translateY(20%)",
    opacity: 0,
  },
});

const DialogContent = styled(Dialog.Content, {
  position: "fixed",
  top: "calc($sizes$headerHeight - 1px)",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "$gray1",
  borderTop: "1px solid $borderDefault",
  p: "$gutter",
  outline: "none",
  "&[data-state=open]": {
    animation: `${enter} 400ms forwards cubic-bezier(.21,1.02,.73,1)`,

    "> *": {
      animation: `${contentEnter} 400ms cubic-bezier(0.52, 0.16, 0.24, 1)`,
    },
  },
  "&[data-state=closed]": {
    animation: `${exit} 200ms forwards cubic-bezier(.06,.71,.55,1)`,

    "> *": {
      animation: `${contentExit} 200ms cubic-bezier(0.52, 0.16, 0.24, 1)`,
    },
  },
});

// *----------------- NavMenuMobile -----------------*

export const NavMenuMobile = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog.Root onOpenChange={setOpen} open={open} modal={false}>
      <Dialog.Trigger asChild>
        <IconBox
          as="button"
          size="3"
          css={{
            background: "none",
            color: "$textDark",
            padding: 0,
            outline: "none",
            touchAction: "manipulation",
          }}
          role="button"
        >
          {open ? <Cross2Icon /> : <HamburgerMenuIcon />}
        </IconBox>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* <Dialog.DialogOverlay /> */}
        <DialogContent>
          <Stack.V spacing="3">
            <Stack.V spacing="2" css={{ borderBottom: "2px solid $borderMuted" }}>
              <Heading size="1" color="muted">
                Products
              </Heading>
              <Stack.V
                spacing={"0"}
                css={{
                  "> * + *": {
                    borderTop: "1px solid $borderMuted",
                  },
                }}
              >
                {productOffering.map((l) => (
                  <NextLink href={l.slug} key={l.slug}>
                    <Stack.H noShrink spacing="4" align="center" css={{ py: "$3" }}>
                      <IconBox
                        size="5"
                        css={{
                          transform: "translateY(5%)",
                          "> *": {
                            maxHeight: "100%",
                          },
                        }}
                      >
                        <NextImage
                          src={l.iconSrc}
                          width={l.width}
                          height={l.height}
                          layout="fixed"
                          alt=""
                        />
                      </IconBox>
                      <Stack.V spacing="0">
                        <Heading size="3" color="muted">
                          {l.product}
                        </Heading>
                        <Heading size="3">{l.segment}</Heading>
                        <Heading size="1" color="muted">
                          {l.companySize}
                        </Heading>
                      </Stack.V>
                    </Stack.H>
                  </NextLink>
                ))}
              </Stack.V>
            </Stack.V>
            <Stack.V
              spacing="0"
              css={{
                "> * + *": {
                  borderTop: "1px solid $borderMuted",
                },
              }}
            >
              {resourcesLinks.map((l) => (
                <NextLink href={l.slug} key={l.slug}>
                  <RowLink size="2" color="default">
                    {l.label}
                  </RowLink>
                </NextLink>
              ))}
              {[...links, routes.team, routes.careers].map((l) => (
                <NextLink href={l.slug} key={l.slug}>
                  <RowLink size="2" color="default">
                    {l.label}
                  </RowLink>
                </NextLink>
              ))}
            </Stack.V>
          </Stack.V>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const links = [routes.customers, routes.pricing, routes.ashbyStory, routes.blog];

const resourcesLinks = [routes.integrations, routes.support];
