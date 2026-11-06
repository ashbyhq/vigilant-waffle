import { styled } from "../../styles/stitches.config";

export const GradientBackground = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  zIndex: 0,

  variants: {
    intensity: {
      low: {
        opacity: 0.6,
      },
    },
    position: {
      left: {
        WebkitMaskImage:
          "radial-gradient(farthest-side at 35% 50%, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
      },
      right: {
        WebkitMaskImage:
          "radial-gradient(farthest-side at 75% 50%, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
      },
      center: {
        WebkitMaskImage:
          "radial-gradient(farthest-side at 50% 50%, rgb(0, 0, 0), rgba(0, 0, 0, 0))",
      },
    },
    color: {
      primary: {
        gradientBottomRight: "$primary4, $primary6",
      },
      pink: {
        gradientBottomRight: "$pink4, $pink6",
      },
      orange: {
        gradientBottomRight: "$orange4, $orange6",
      },
      primaryToPink: {
        gradientBottomRight: "$primary4, $pink5",
      },
    },
  },
});

export const PatternBackground = styled("div", {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzUyNDZEOCIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0JEQjhGMyIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==")`,
  backgroundImage: `url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='87' height='50.232' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0, 0%, 100%, 0)'/><path d='M0 54.424l14.5-8.373c4.813 2.767 9.705 5.573 14.5 8.37l14.5-8.373V29.303M0 4.193v16.744l-14.5 8.373L0 37.68l14.5-8.374V12.562l29-16.746m43.5 58.6l-14.5-8.37v-33.49c-4.795-2.797-9.687-5.603-14.5-8.37m43.5 25.111L87 37.67c-4.795-2.797-24.187-13.973-29-16.74l-14.5 8.373-14.5-8.37v-33.489m72.5 8.365L87 4.183l-14.5-8.37M87 4.183v16.745L58 37.673v16.744m0-66.976V4.185L43.5 12.56c-4.795-2.797-24.187-13.973-29-16.74L0 4.192l-14.5-8.37m29 33.484c4.813 2.767 9.705 5.573 14.5 8.37V54.42'  stroke-linejoin='round' stroke-linecap='round' stroke-width='1.5' stroke='hsla(245, 65%, 56%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>")`,
  mixBlendMode: "overlay",
});
