import * as React from "react";
import { styled } from "../../styles/stitches.config";
import { ChildrenProps, SvgProps } from "../../utils/props";
import { Box } from "./Box";
import { Spinner } from "./Spinner";
import { Stack } from "./Stack";

const StyledButton = styled("button", {
  borderRadius: "$1",
  color: "$primary1",
  fontWeight: "$medium",
  fontFamily: "$primary",
  letterSpacing: "$body",
  lineHeight: "$body",
  outline: "none",
  userSelect: "none",
  transition: "$microTransform",
  willChange: "transform",

  "&:hover": {
    background: "$primary9",
  },

  "&:active": {
    background: "$primary11",
    transform: "scale(0.96)",
  },

  "&:focus-visible": {
    outline: "2px solid $primary11",
    outlineOffset: "2px",
  },

  "&:disabled": {
    background: "$gray5",
    boxShadow: "$none",
    color: "$gray9",
    cursor: "not-allowed",
    pointerEvents: "none",

    "> div > svg": {
      color: "currentColor",
    },
  },

  "> div": {
    gap: "0.5em",
  },

  "> div > svg": {
    color: "currentColor",
    width: "1em",
    height: "1em",
  },

  variants: {
    size: {
      4: {
        height: "$controlHeight4",
        fontSize: "$4",
        px: "$6",
      },
      3: {
        height: "$controlHeight3",
        fontSize: "$3",
        px: "$5",
      },
      2: {
        height: "$controlHeight2",
        fontSize: "$3",
        px: "$5",
      },
      1: {
        height: "$controlHeight1",
        fontSize: "$2",
        px: "$4",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
    },
    appearance: {
      primary: {
        background: "$primaryGradient",
        boxShadow: "$inset",
        border: "1px solid transparent",

        "&:active": {
          boxShadow: "$insetPressed",
        },

        "> div > svg": {
          color: "hsla(0deg 0% 100% / 0.6)",
        },
      },
      minimal: {
        background: "transparent",
        color: "$primary",

        "&:hover": {
          background: "$primary3",
        },

        "&:active": {
          color: "$primary11",
          background: "$primary4",
        },
      },
      default: {
        background: "$primary3",
        color: "$primary",
        border: "1px solid $primary5",

        "&:hover": {
          background: "$primary4",
          border: "1px solid $primary6",
        },

        "&:active": {
          color: "$primary11",
          background: "$primary4",
          border: "1px solid $primary7",
        },
      },
    },
  },

  defaultVariants: {
    appearance: "primary",
    size: "3",
  },
});

export const IconButton = styled("button", {
  display: "inline-flex",
  justifyContent: "center",
  borderRadius: "$1",
  alignItems: "center",
  p: 0,

  width: "$$iconButtonSize",
  height: "$$iconButtonSize",

  "> svg": {
    width: "calc($$iconButtonSize - 8px)",
    height: "calc($$iconButtonSize - 8px)",
    fill: "currentColor",
  },

  variants: {
    size: {
      1: {
        $$iconButtonSize: "22px",
      },
      2: {
        $$iconButtonSize: "26px",
      },
    },
    appearance: {
      primary: {
        background: "$primary3",
        color: "$primary9",

        "&:hover": {
          background: "$primary4",
        },

        "&:active": {
          color: "$primary11",
          background: "$primary5",
        },
      },
      minimal: {
        background: "transparent",
        color: "$textDefault",

        "&:hover": {
          background: "$gray3",
          color: "$textDark",
        },

        "&:active": {
          background: "$gray5",
          color: "$textHeading",
        },
      },
    },
  },
});

export type ButtonProps = {
  iconBefore?: React.ComponentType<SvgProps>;
  iconAfter?: React.ComponentType<SvgProps>;
  loading?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> &
  React.ComponentProps<typeof StyledButton> &
  ChildrenProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { iconBefore: IconBefore, iconAfter: IconAfter, loading, size, children, ...buttonProps },
    forwardRef,
  ) => {
    return (
      <StyledButton ref={forwardRef} size={size} disabled={loading} {...buttonProps}>
        <Stack.H align={"center"} justify={"center"}>
          {loading ? (
            <Spinner
              css={{
                width: "1.25em",
                height: "1.25em",
              }}
            />
          ) : (
            IconBefore && <IconBefore />
          )}
          <Box as="span">{children}</Box>
          {IconAfter && <IconAfter />}
        </Stack.H>
      </StyledButton>
    );
  },
);

Button.displayName = "Button";
