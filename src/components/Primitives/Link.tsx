import * as React from "react";
import { styled } from "../../styles/stitches.config";
import type * as Stitches from "@stitches/react";
import { Stack } from "./Stack";
import { IconBox } from "./IconBox";
import { SvgProps } from "../../utils/props";
import { Box } from "./Box";

export const StyledLink = styled("a", {
  fontWeight: "$medium",
  cursor: "pointer",
  userSelect: "none",
  textDecoration: "none",

  svg: {
    width: "100%",
    height: "100%",
    transition: "$microTransform",
  },

  "&:hover": {
    textDecoration: "underline",
  },

  variants: {
    color: {
      primary: {
        color: "$primary",

        "&:hover": {
          color: "$primary10",
        },

        "&:active": {
          color: "$primary11",
        },
      },
      default: {
        color: "$textDark",
      },
    },
    size: {
      1: {
        fontSize: "$2",
      },
      2: {
        fontSize: "$3",
      },
      3: {
        fontSize: "$4",
      },
    },
  },
});

type LinkProps = {
  children: React.ReactNode;
  iconAfter?: React.ComponentType<SvgProps>;
  iconBefore?: React.ComponentType<SvgProps>;
  isExternal?: boolean;
  spacing?: Stitches.VariantProps<typeof Stack.H>["spacing"];
} & Stitches.VariantProps<typeof StyledLink> &
  React.ComponentProps<typeof StyledLink>;

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { children, iconAfter: IconAfter, iconBefore: IconBefore, isExternal, spacing = "2", ...rest },
    ref,
  ) => {
    const externalLinkAttributes = isExternal
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
        }
      : {};

    return (
      <StyledLink ref={ref} {...externalLinkAttributes} {...rest}>
        <Stack.H spacing={spacing} align="center">
          {IconBefore && (
            <IconBox size="em">
              <IconBefore />
            </IconBox>
          )}
          <Box as="span">{children}</Box>
          {IconAfter && (
            <IconBox size="em">
              <IconAfter />
            </IconBox>
          )}
        </Stack.H>
      </StyledLink>
    );
  },
);
