import type * as Stitches from "@stitches/react";
import { createStitches } from "@stitches/react";

type SpaceValue = Stitches.ScaleValue<"space"> | "auto" | number;

export const breakpoints = {
  initial: 0,
  mobile: 640,
  tablet: 827,
  desktop: 960,
};

export const { styled, getCssText, css, theme, globalCss, keyframes } = createStitches({
  media: {
    mobile: `(max-width: ${breakpoints.mobile}px)`,
    tablet: `(max-width: ${breakpoints.tablet}px)`,
    desktopAndUp: `(min-width: ${breakpoints.tablet}px)`,
    desktopAndDown: `(max-width: ${breakpoints.desktop}px)`,
  },
  theme: {
    fonts: {
      primary:
        "'TTNormsPro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
      serif:
        "'Signifier', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    },
    colors: {
      primary13: "#0C092A",
      primary12: "#252060",
      primary11: "#3F34BC",
      primary10: "#473BCE",
      primary9: "#5246D8",
      primary8: "#A099EC",
      primary7: "#BDB8F3",
      primary6: "#D3CFF9",
      primary5: "#E1DEFC",
      primary4: "#EBE9FE",
      primary3: "#F3F2FF",
      primary2: "#FAFAFF",
      primary1: "#FCFCFE",

      pink1: "hsla(311, 59%, 99%, 1)",
      pink2: "hsla(311, 89%, 99%, 1)",
      pink3: "hsla(312, 79%, 98%, 1)",
      pink4: "hsla(312, 79%, 95%, 1)",
      pink5: "hsla(312, 82%, 92%, 1)",
      pink6: "hsla(312, 86%, 88%, 1)",
      pink7: "hsla(312, 87%, 82%, 1)",
      pink8: "hsla(312, 92%, 76%, 1)",
      pink9: "hsla(315, 95%, 68%, 1)",
      pink10: "hsla(315, 80%, 60%, 1)",
      pink11: "hsla(315, 70%, 50%, 1)",
      pink12: "hsla(315, 65%, 14%, 1)",

      orange1: "hsla(27, 70%, 99%, 1)",
      orange2: "hsla(27, 100%, 98%, 1)",
      orange3: "hsla(26, 100%, 95%, 1)",
      orange4: "hsla(26, 100%, 92%, 1)",
      orange5: "hsla(25, 100%, 89%, 1)",
      orange6: "hsla(24, 100%, 85%, 1)",
      orange7: "hsla(25, 97%, 76%, 1)",
      orange8: "hsla(24, 95%, 67%, 1)",
      orange9: "hsla(24, 95%, 60%, 1)",
      orange10: "hsla(24, 95%, 52%, 1)",
      orange11: "hsla(24, 92%, 47%, 1)",
      orange12: "hsla(24, 65%, 14%, 1)",

      gray1: "#FCFCFD",
      gray2: "#F7F7F8",
      gray3: "#F3F2F4",
      gray4: "#EEEDEF",
      gray5: "#E8E8EA",
      gray6: "#E5E5E6",
      gray7: "#DBDBDC",
      gray8: "#CBCBCD",
      gray9: "#9C9CA0",
      gray10: "#908F94",
      gray11: "#717075",
      gray12: "#373739",
      gray13: "#141415",

      red1: "hsl(359 100% 99.4%)",
      red2: "hsl(359 100% 98.6%)",
      red3: "hsl(360 100% 96.8%)",
      red4: "hsl(360 97.9% 94.8%)",
      red5: "hsl(360 90.2% 91.9%)",
      red6: "hsl(360 81.7% 87.8%)",
      red7: "hsl(359 74.2% 81.7%)",
      red8: "hsl(359 69.5% 74.3%)",
      red9: "hsl(358 75.0% 59.0%)",
      red10: "hsl(358 69.4% 55.2%)",
      red11: "hsl(358 65.0% 48.7%)",
      red12: "hsl(354 57.5% 31.65%)",
      red13: "hsl(354 50.0% 14.6%)",

      green9: "#05bd8c",

      // pink9: "#F551CC",
      // pink10: "#D93AB2",

      // orange9: "#FA8638",
      // orange10: "#E97325",

      primary: "$primary9",
      accent: "$pink9",
      accent2: "$orange9",

      primaryGradient: "linear-gradient(to bottom, hsl(248deg 65% 60%), $colors$primary9)",

      /** ********** Text Colors ************/
      textHeading: "$gray13",
      textDark: "$gray12",
      textDefault: "$gray11",
      textMuted: "$gray9",
      textLight: "$gray8",

      /** ********** Intent Colors ************/

      /** ********** Border Colors ************/
      borderDark: "$gray6",
      borderDefault: "$gray5",
      borderMuted: "$gray4",

      /** ********** Background Colors ************/
      bgTint1: "$primary1",
      bgTint2: "$primary2",

      white: "#fff",
      black: "#000",
    },
    shadows: {
      focus: "0 0 0 3px $colors$primary5",
      inputInset: "inset 0 1px 2px rgba(20, 20, 21, 0.1)",
      inset: "inset 0 0 0 1px rgba(20, 20, 21, 0.16), inset 0 1px 2px hsl(0, 0%, 100%, 0.2)",
      insetMuted: "inset 0 0 0 1px rgba(20, 20, 21, 0.1), inset 0 1px 2px hsl(0, 0%, 100%, 0.12)",
      border: "0 0 0 1px rgba(20, 20, 21, 0.08)",
      image:
        "0px 0px 1px rgba(20, 20, 21, 0.18), 0px 3px 8px rgba(20, 20, 21, .11), 0px 13px 20px rgba(20, 20, 21, .09)",
      image2:
        "0px 0px 1px rgba(20, 20, 21, 0.18), 0px 8px 16px -8px rgba(20, 20, 21, .15), 0px 12px 26px -8px rgba(20, 20, 21, .2)",
      imageOverlay:
        "0 0 0 3px hsla(0deg 0% 0% / 0.1), 0px 3px 8px rgba(20, 20, 21, .2), 0px 13px 20px rgba(20, 20, 21, .15)",
      insetPressed: "inset 0 0 0 1px rgba(20, 20, 21, 0.12), inset 0 1px 2px hsl(0, 0%, 0%, 0.15)",
      buttonPrimaryFocus: "0 0 0 3px rgba($primary, 0.07)",
      elevation1: "0px 0px 1px rgba(20, 20, 21, 0.18), 0px 2px 3px -2px rgba(20, 20, 21, 0.3)",
      elevation2: "0px 0px 1px rgba(20, 20, 21, 0.14), 0px 4px 8px -4px rgba(20, 20, 21, 0.35)",
      elevation3: "0px 0px 1px rgba(20, 20, 21, 0.14), 0px 6px 16px -6px rgba(20, 20, 21, 0.4)",
    },
    borderStyles: {
      solid: "solid",
      dashed: "dashed",
    },
    borderWidths: {
      default: "1px",
      medium: "2px",
    },
    sizes: {
      wideCard: "1296px",
      containerWide: "1200px",
      containerNormal: "980px",
      containerSmall: "760px",
      proseContainer: "650px",
      headerHeight: "60px",
      controlHeight4: "44px",
      controlHeight3: "36px",
      controlHeight2: "32px",
      controlHeight1: "28px",
    },
    space: {
      1: "0.125rem", // 2px
      2: "0.25rem", // 4px
      3: "0.5rem", // 8px
      4: "0.75rem", // 12px
      5: "1rem", // 16px
      6: "1.5rem", // 24px
      7: "2rem", // 32px
      8: "3rem", // 48px
      9: "4rem", // 64px
      10: "6rem", // 96px
      11: "8rem", // 128px
      12: "12rem", // 192px
      13: "16rem", // 256px
      gutter: "1.5rem",
    },
    transitions: {
      microTransform: "150ms transform cubic-bezier(0.16, 1, 0.3, 1)",
      longTransform: "400ms transform cubic-bezier(0.16, 1, 0.3, 1)",
      short: "180ms",
      default: "250ms",
      long: "400ms",
    },
    fontSizes: {
      1: "0.75rem", // 12px
      2: "0.875rem",
      3: "1rem",
      35: "1.125rem",
      4: "1.25rem", // 20px
      5: "1.5rem",
      6: "1.875rem",
      7: "2.25rem", // 36px
      8: "2.75rem",
      9: "3.25rem",
      10: "4.5rem",
    },
    fontWeights: {
      heading: 575,
      medium: 500,
      body: 400,
    },
    lineHeights: {
      title: 1.1,
      heading: 1.25,
      body: 1.5,
    },
    letterSpacings: {
      title: "-0.04em",
      heading: "-0.025em",
      body: "-0.008em",
      caps: "0.06em",
    },
    radii: {
      1: "6px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      round: "9999px",
    },
  },
  utils: {
    p: (value: SpaceValue) => ({
      paddingTop: value,
      paddingBottom: value,
      paddingLeft: value,
      paddingRight: value,
    }),
    pt: (value: SpaceValue) => ({
      paddingTop: value,
    }),
    pr: (value: SpaceValue) => ({
      paddingRight: value,
    }),
    pb: (value: SpaceValue) => ({
      paddingBottom: value,
    }),
    pl: (value: SpaceValue) => ({
      paddingLeft: value,
    }),
    px: (value: SpaceValue) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingX: (value: string) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    py: (value: SpaceValue) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
    paddingY: (value: string) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: SpaceValue) => ({
      marginTop: value,
      marginBottom: value,
      marginLeft: value,
      marginRight: value,
    }),
    mt: (value: SpaceValue) => ({
      marginTop: value,
    }),
    mr: (value: SpaceValue) => ({
      marginRight: value,
    }),
    mb: (value: SpaceValue) => ({
      marginBottom: value,
    }),
    ml: (value: SpaceValue) => ({
      marginLeft: value,
    }),
    mx: (value: SpaceValue | "auto") => ({
      marginLeft: value,
      marginRight: value,
    }),
    my: (value: SpaceValue) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: string) => ({ textAlign: value }),
    gradientRight: (value: string) => ({
      backgroundImage: `linear-gradient(to right, ${value})`,
    }),
    gradientBottom: (value: string) => ({
      backgroundImage: `linear-gradient(to bottom, ${value})`,
    }),
    gradientBottomRight: (value: string) => ({
      backgroundImage: `linear-gradient(to bottom right, ${value})`,
    }),
    backgroundSoftFadeEdges: (value: string) => ({
      WebkitMaskImage: `linear-gradient(to right, transparent 0%, black ${value}, black calc(100% - ${value}), transparent 100%)`,
    }),
  },
});

export const globalStyles = globalCss({
  body: {
    background: "$primary1",
    color: "$textDefault",
    lineHeight: "$body",
    fontFamily: "$primary",
    fontWeight: "$body",
    fontSize: "$3",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    height: "100%",
    WebkitTapHighlightColor: "transparent",
  },

  html: {
    scrollPaddingTop: "calc($sizes$headerHeight + 45px)",
    touchAction: "manipulation",
  },

  strong: {
    fontWeight: "$heading",
    color: "$textHeading",
  },
  a: {
    cursor: "pointer",
  },
});
