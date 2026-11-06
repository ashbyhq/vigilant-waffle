import { NextImage } from "./NextImage";
import { AshbyLogo } from "./Primitives/AshbyLogo";
import { Box } from "./Primitives/Box";
import { Button, ButtonProps } from "./Primitives/Button";
import { Grid } from "./Primitives/Grid";
import { Heading } from "./Primitives/Heading";
import { Stack } from "./Primitives/Stack";
import { Paragraph } from "./Primitives/Text";
import { NextLink } from "./NextLink";
import { routes } from "../utils/routes";

interface CTAProps {
  imgSrc?: string;
  title?: string;
  subtitle?: string;
}

export const CTA = ({
  imgSrc = "/images/cta_thumbnail.jpg",
  title = "Hiring excellence is one conversation away.",
  subtitle = "Connect with our team and learn how Ashby can help your team grow faster and better.",
}: CTAProps) => {
  return (
    <Box
      css={{
        borderRadius: "$4",
        boxShadow: "$elevation1",
        gradientBottomRight: "$white, hsla(0deg 0% 100% / 0.3)",
        p: "$9",
        overflow: "hidden",
        isolation: "isolate",

        "@tablet": {
          p: "$6",
        },
      }}
    >
      <Grid css={{ $$itemWidth: "300px", alignItems: "center" }} spacing={"7"}>
        <Stack.V spacing="6" align="start">
          <AshbyLogo size="small" />
          <Stack.V spacing="3" align="start">
            <Heading size="8">{title}</Heading>
            <Paragraph size="4">{subtitle}</Paragraph>
          </Stack.V>
          <RequestDemoButton />
        </Stack.V>
        <Box css={{ marginRight: "-80px" }}>
          <NextImage
            src={imgSrc}
            width={1600}
            height={1067}
            layout="responsive"
            alt="Woman working with a laptop"
            css={{
              borderRadius: "$2",
              overflow: "hidden",
              boxShadow: "$elevation1",
            }}
          />
        </Box>
      </Grid>
    </Box>
  );
};

interface RequestDemoButtonProps {
  buttonProps?: ButtonProps;
  perserveParams?: boolean;
}

const RequestDemoButton = ({ buttonProps, perserveParams }: RequestDemoButtonProps) => {
  return (
    <NextLink href={routes.requestDemo.slug} perserveParams={perserveParams}>
      <Button appearance={"primary"} size={{ "@desktopAndUp": "4" }} {...buttonProps}>
        {routes.requestDemo.label}
      </Button>
    </NextLink>
  );
};
