import * as React from "react";
import { keyframes, styled } from "../../styles/stitches.config";

const spinKeyframes = keyframes({
  "0%": {
    transform: "rotate(0)",
  },

  "100%": {
    transform: "rotate(360deg)",
  },
});

const loadingInner = keyframes({
  "0%": {
    strokeDashoffset: 600,
  },

  "100%": {
    strokeDashoffset: 0,
  },
});

const StyledSpinner = styled("div", {
  display: "inline-block",

  svg: {
    width: "100%",
    height: "100%",
  },

  ".spinner_track": {
    fill: "transparent",
    stroke: "$gray3",
    strokeWidth: 10,
  },

  ".spinner_outer": {
    animation: `${spinKeyframes} 2s linear infinite`,
  },

  ".spinner_inner": {
    animation: `${loadingInner} 1.75s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite`,
    fill: "transparent",
    stroke: "$gray7",
    strokeDasharray: 300,
    strokeDashoffset: 600,
    strokeLinecap: "round",
    strokeMiterlimit: 10,
    strokeWidth: 10,
  },

  variants: {
    size: {
      4: {
        width: "$controlHeight4",
        height: "$controlHeight4",
      },
      3: {
        width: "$controlHeight3",
        height: "$controlHeight3",
      },
      2: {
        width: "$controlHeight2",
        height: "$controlHeight2",
      },
      1: {
        width: "$controlHeight1",
        height: "$controlHeight1",
      },
    },
  },
});

type SpinnerProps = React.ComponentPropsWithoutRef<typeof StyledSpinner>;

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>((props, forwardRef) => {
  return (
    <StyledSpinner ref={forwardRef} aria-label="Loading..." role="progressbar" {...props}>
      <svg className="spinner_outer" x="0" y="0" viewBox="0 0 150 150">
        <circle className={"spinner_track"} cx="75" cy="75" r="60" />
        <circle className={"spinner_inner"} cx="75" cy="75" r="60" />
      </svg>
    </StyledSpinner>
  );
});

Spinner.displayName = "spinner";
