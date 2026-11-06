import AshbyPlatform from "../../assets/ashby_platform.svg";
import AnalyticsIcon from "../../assets/analytics-icon.svg";
import CRMIcon from "../../assets/crm-icon.svg";
import SchedulingIcon from "../../assets/scheduling-icon.svg";
import ATSIcon from "../../assets/ats-icon.svg";
import { styled } from "../../styles/stitches.config";
import { Box } from "../Primitives/Box";
import { Heading } from "../Primitives/Heading";
import { Grid } from "../Primitives/Grid";
import { Stack } from "../Primitives/Stack";
import { Paragraph } from "../Primitives/Text";
import { ChildrenProps } from "../../utils/props";
import Tilt from "react-parallax-tilt";
import { CSS } from "@stitches/react";

interface ProductFeatureWithText {
  title: string;
  stats?: React.ReactNode;
  Images?: React.ReactNode;
  description: string;
  quote?: any;
  href?: string;
  img: {
    src: string;
    width?: number;
    height?: number;
  };
}

interface Module {
  title: string;
  subtitle?: string;
  icon: React.JSX.Element;
  index: number;
}

export const modules: Module[] = [
  {
    title: "Ashby Platform",
    icon: AshbyPlatform,
    index: 0,
  },
  {
    title: "ATS",
    subtitle: "An ATS that combines ease of use with customizability and automation.",
    icon: ATSIcon,
    index: 1,
  },
  {
    title: "Scheduling",
    icon: SchedulingIcon,
    subtitle: "Improve productivity and candidate experience with scheduling automation.",
    index: 2,
  },
  {
    title: "CRM",
    subtitle:
      "From outreach sequences to candidate rediscovery - everything you’d expect from a powerful CRM.",
    icon: CRMIcon,
    index: 3,
  },
  {
    title: "Analytics",
    subtitle:
      "Truly powerful reporting and analytics. Unlock insights and change behaviors in real-time.",
    icon: AnalyticsIcon,
    index: 4,
  },
];

// *----------------- Layout Components -----------------*

interface LayoutProps extends ChildrenProps {
  css?: CSS;
}

const _Layout = ({ children, css }: LayoutProps) => (
  <Stack.H
    spacing="0"
    align="center"
    css={{
      height: "100%",
      overflow: "hidden",
      "@tablet": {
        pb: "$6",
      },
      ...css,
    }}
  >
    {children}
  </Stack.H>
);

const ContentContainer = ({ children }) => (
  <Stack.V
    spacing="6"
    css={{
      flex: "1 1 0%",
      minWidth: "min(100%, 400px)",
      padding: "clamp($6, 5vw, 72px)",
    }}
  >
    {children}
  </Stack.V>
);

const MediaContainer = ({ children, css = {} }) => (
  <Box
    css={{
      position: "relative",
      flex: "1.8 1 0%",
      minWidth: "min(100%, 700px)",
      "@desktopAndDown": {
        paddingLeft: "clamp($6, 5vw, 72px)",
      },
      ...css,
    }}
  >
    {children}
  </Box>
);

export const Layout = Object.assign({}, { Root: _Layout, ContentContainer, MediaContainer });

// *----------------- Header -----------------*

interface HeaderProps {
  title: ProductFeatureWithText["title"];
  stats?: ProductFeatureWithText["stats"];
  description: ProductFeatureWithText["description"];
}

export const Header = ({ title, stats, description }: HeaderProps) => (
  <Stack.V spacing="4">
    <Heading size="7" css={{ maxWidth: "min(100%, 340px)" }}>
      {title}
    </Heading>
    {stats}
    <Paragraph size="3">{description}</Paragraph>
  </Stack.V>
);

// *----------------- ModulesGrid -----------------*

interface ModulesGrid {
  modules: Module[];
  onClick: React.Dispatch<React.SetStateAction<number>>;
}

const ModulesGrid = ({ modules, onClick }: ModulesGrid) => {
  return (
    <Grid css={{ $$itemWidth: "200px", alignItems: "start" }} spacing="6">
      {modules.slice(1).map((m) => (
        <Box
          as="button"
          css={{
            all: "unset",
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
            },
          }}
          onClick={() => onClick(m.index)}
          key={m.title}
        >
          <Heading size="3" color="primary">
            {m.title}
          </Heading>
          <Paragraph size="2">{m.subtitle}</Paragraph>
        </Box>
      ))}
    </Grid>
  );
};

// *----------------- Styled Components -----------------*

export const CircularButton = styled("button", {
  all: "unset",
  borderRadius: "$round",
  width: 32,
  height: 32,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  background: "$gray11",
  cursor: "pointer",

  svg: {
    width: 20,
    height: 20,
    color: "$gray4",
  },

  "&:hover": {
    background: "$gray11",
  },

  "&:active": {
    background: "$gray13",
  },
});

export const ImageContainer = styled("div", {
  borderRadius: "$3",
  width: "100%",
  overflow: "hidden",
  boxShadow: "$image",
});

export const ImageContainerOverlayed = styled(ImageContainer, {
  width: "100%",
  position: "absolute",
  boxShadow: "$imageOverlay",
});

const StyledTilt = styled(Tilt, {});

type TiltProps = React.ComponentProps<typeof StyledTilt>;

const TiltDefault = (props: TiltProps) => (
  <StyledTilt
    tiltMaxAngleX={10}
    tiltMaxAngleY={10}
    glareEnable={true}
    transitionEasing={"cubic-bezier(0.16, 1, 0.3, 1)"}
    transitionSpeed={700}
    glareReverse
    glareMaxOpacity={0.4}
    glarePosition="all"
    scale={1.1}
    {...props}
  />
);

export const ImageTilt = ({ children, css }: TiltProps) => (
  <TiltDefault
    css={{
      position: "absolute",
      width: "100%",
      overflow: "hidden",
      ...css,
      "&:hover": {
        zIndex: 2,
      },
    }}
  >
    {children}
  </TiltDefault>
);
