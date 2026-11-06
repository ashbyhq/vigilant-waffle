import { AnimatePresence, motion } from "framer-motion";

import * as React from "react";
import { Tween } from "react-gsap";
import { Clickable } from "../Primitives/Clickable";
import { Heading } from "../Primitives/Heading";
import { IconBox } from "../Primitives/IconBox";
import { Stack } from "../Primitives/Stack";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Container } from "../Primitives/Container";
import { Quote } from "../Quote";
import {
  CircularButton,
  Header,
  ImageContainer,
  Layout,
  modules,
  ImageContainerOverlayed,
  ImageTilt,
} from "./PlatformShowcaseComponents";
import { NextImage } from "../NextImage";
import { Box } from "../Primitives/Box";
import { Media } from "../MediaQuery";
import { useCustomerQuotes } from "../CustomerQuotesContext";
import config from "../../../config.json";
const MotionStackV = motion(Stack.V);

export const PlatformShowcase = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const currentFeature = featuresList[currentIndex];

  const CurrentShowcase = currentFeature.component;

  const nextSlide = () => setCurrentIndex((c) => (c + 1) % featuresList.length);
  const previousSlide = () =>
    setCurrentIndex((c) =>
      (c - 1) % featuresList.length < 0 ? featuresList.length - 1 : (c - 1) % featuresList.length,
    );

  return (
    <AnimatePresence>
      <Tween from={{ autoAlpha: 0 }} position="end" duration={1.5} ease="expo.out">
        <MotionStackV
          animate={"animate"}
          initial={"initial"}
          spacing="5"
          css={{ visibility: "hidden" }}
        >
          <Container>
            <Stack.H align="center" justify={"between"}>
              <Stack.H
                align="center"
                spacing={{ "@desktopAndUp": "8", "@mobile": "4" }}
                justify={{ "@mobile": "between" }}
                css={{
                  "@mobile": {
                    width: "100%",
                  },
                }}
              >
                {featuresList.map((feature, index) => (
                  <Tab
                    key={feature.title}
                    title={feature.title}
                    icon={feature.icon}
                    isSelected={feature.title === currentFeature.title}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </Stack.H>

              <Media greaterThanOrEqual="mobile">
                <Stack.H justify={"end"} align="center" spacing="6">
                  <CircularButton
                    onClick={previousSlide}
                    aria-controls="ashby-modules-carousel"
                    aria-label="Previous carousel item"
                  >
                    <ArrowLeftIcon />
                  </CircularButton>
                  <CircularButton
                    onClick={nextSlide}
                    aria-controls="ashby-modules-carousel"
                    aria-label="Next carousel item"
                  >
                    <ArrowRightIcon />
                  </CircularButton>
                </Stack.H>
              </Media>
            </Stack.H>
          </Container>
          <Container
            id="ashby-modules-carousel"
            size="card"
            css={{
              borderRadius: "$4",
              backgroundColor: "$white",
              boxShadow: "$elevation1",
              minHeight: "510px",
              display: "flex",
              alignItems: "center",

              p: 0,

              "@tablet": {
                height: "auto",
                borderRadius: 0,
              },
            }}
          >
            <CurrentShowcase />
          </Container>
        </MotionStackV>
      </Tween>
    </AnimatePresence>
  );
};

// *----------------- Tab -----------------*

const Tab = ({ onClick, isSelected, icon: Icon, title }) => {
  return (
    <Clickable
      onClick={onClick}
      css={{
        px: "$4",
        py: "$3",
        userSelect: "none",
        "@mobile": {
          border: "1px solid $primary6",
        },
      }}
      aria-expanded={isSelected}
    >
      <Stack.H spacing="5" align="center" noShrink>
        <IconBox size={"3"} css={{ svg: { width: "100%" } }} role="img">
          <Icon />
        </IconBox>
        <Heading
          size="4"
          color={isSelected ? "heading" : "default"}
          css={{ "@mobile": { display: "none" } }}
        >
          {title}
        </Heading>
      </Stack.H>
    </Clickable>
  );
};

// *----------------- AshbyPlatform -----------------*

const AshbyPlatformContent = () => (
  <Layout.Root css={{ overflow: "visible", "@tablet": { overflow: "hidden", pb: "$6" } }}>
    <Layout.ContentContainer>
      <Stack.V spacing="6">
        <Header
          title="All-In-One Recruiting Platform"
          description="An integrated solution designed to help companies of all sizes excel at hiring. Ambitious hiring teams love Ashby."
        />
        <Box
          css={{
            width: "90%",
            "@desktopAndDown": { width: "70%", mx: "auto" },
          }}
        >
          <NextImage
            src="/images/homepage/all-in-one-illustration.svg"
            width={1307}
            height={1071}
            layout={"responsive"}
            alt={"Ashby Platform Illustration"}
          />
        </Box>
      </Stack.V>
    </Layout.ContentContainer>
    <Layout.MediaContainer
      css={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <ImageContainer
        css={{
          "@tablet": { minWidth: "105%" },
          boxShadow: "none",
          display: "flex",
          "@mobile": { visibility: "hidden", opacity: 0 },
        }}
      >
        <NextImage
          src={`/images/homepage/woman-working-with-laptop.jpg`}
          width={1400}
          height={868}
          priority
          alt="Woman working with a laptop"
        />
      </ImageContainer>
      <ImageTilt
        css={{
          right: "-5%",
          top: "-10%",
          maxWidth: 320,
          boxShadow: "$image2",
          borderRadius: "$2",

          "@tablet": {
            maxWidth: 240,
            right: "-5%",
            top: "-5%",
          },
        }}
      >
        <NextImage
          src="/images/product/analytics-micro.png"
          layout="responsive"
          width={774}
          height={788}
          priority
          alt="Analytics charts"
        />
      </ImageTilt>
      <ImageTilt
        css={{
          bottom: "-32%",
          right: "-2%",
          boxShadow: "$image2",
          maxWidth: 360,
          borderRadius: "$2",
          "@desktopAndDown": {
            bottom: "-22%",
            left: "-2%",
          },
          "@tablet": {
            maxWidth: 240,
            borderRadius: "$2",
          },
        }}
      >
        <NextImage
          src="/images/product/candidate-pipeline-micro.png"
          priority
          width={1203}
          height={1064}
          layout="responsive"
          alt="Candidate Pipeline view"
        />
      </ImageTilt>
    </Layout.MediaContainer>
  </Layout.Root>
);

// *----------------- ATSContent -----------------*

const ATSContent = () => {
  const customerQuotes = useCustomerQuotes();
  const quote = customerQuotes.find((quote) => quote.slug === config.homepage_ats_quote);

  return (
    <Layout.Root>
      <Layout.ContentContainer>
        <Stack.V spacing="6">
          <Header
            title="Ease of use and customization—together"
            description="Built with recruiters and hiring managers in mind – less clicks and easy to use, with the approvals, alerts and automation admins need."
          />
          <Quote {...quote} size="small" color="heading" />
        </Stack.V>
      </Layout.ContentContainer>
      <Layout.MediaContainer>
        <ImageContainer
          css={{
            minWidth: "120%",
          }}
        >
          <NextImage
            src="/images/homepage/ats-render.png"
            layout="responsive"
            width={1900}
            height={986}
            priority
            alt="Candidate Pipeline view"
          />
        </ImageContainer>
        <ImageContainerOverlayed
          css={{
            top: "10%",
            right: -24,
            maxWidth: "40%",
          }}
        >
          <NextImage
            src="/images/product/add-activity.png"
            layout="responsive"
            width={926}
            height={1704}
            priority
            alt="Add Interview Acitivity panel"
          />
        </ImageContainerOverlayed>
      </Layout.MediaContainer>
    </Layout.Root>
  );
};

// *----------------- SchedulingContent -----------------*

const SchedulingContent = () => {
  const customerQuotes = useCustomerQuotes();
  const quote = customerQuotes.find((quote) => quote.slug === config.homepage_scheduling_quote);

  return (
    <Layout.Root>
      <Layout.ContentContainer>
        <Stack.V spacing="6">
          <Header
            title="Powerful and beautiful scheduling automation"
            description="Direct booking provides beautiful candidate self-scheduling. Powerful manual scheduling speeds up scheduling complex panel interviews."
          />
          <Quote {...quote} size="small" color="heading" />
        </Stack.V>
      </Layout.ContentContainer>
      <Layout.MediaContainer>
        <ImageContainer
          css={{
            minWidth: "120%",
          }}
        >
          <NextImage
            priority
            src="/images/product/scheduling-hero-render.png"
            width={1800}
            height={901}
            layout="responsive"
            alt="Scheduling view"
          />
        </ImageContainer>
        <ImageContainerOverlayed
          css={{
            transform: "translate(-15%, 10%)",
            maxWidth: 200,
            width: "100%",
            top: 0,
            left: 0,
            "@tablet": {
              maxWidth: "140px",
              transform: "translate(5%, 15%)",
            },
          }}
        >
          <NextImage
            priority
            src="/images/product/booking-link.png"
            width={800}
            height={1732}
            layout="responsive"
            alt="Candidate choosing date and time for interview"
          />
        </ImageContainerOverlayed>
      </Layout.MediaContainer>
    </Layout.Root>
  );
};

// *----------------- CRMContent -----------------*

const CRMContent = () => {
  const customerQuotes = useCustomerQuotes();
  const quote = customerQuotes.find((quote) => quote.slug === config.homepage_crm_quote);

  return (
    <Layout.Root>
      <Layout.ContentContainer>
        <Stack.V spacing="6">
          <Header
            title="Source, engage and track passive candidates"
            description="Source new candidates in one click, using best-in-class email lookups and multi-touch-sequences. Build relationships with talent pools over time. Track DEI metrics across all your sourcing activities."
          />
          <Quote {...quote} size="small" color="heading" />
        </Stack.V>
      </Layout.ContentContainer>
      <Layout.MediaContainer>
        <ImageContainer
          css={{
            transform: "translateX(-3%)",
            boxShadow: "none",
            "@tablet": {
              minWidth: "100%",
            },
          }}
        >
          <NextImage
            priority
            src="/images/product/crm-hero.png"
            layout="responsive"
            width={2085}
            height={1437}
            alt="Ashby Chrome extension and email editor"
          />
        </ImageContainer>
      </Layout.MediaContainer>
    </Layout.Root>
  );
};

// *----------------- AnalyticsContent -----------------*

const AnalyticsContent = () => {
  const customerQuotes = useCustomerQuotes();
  const quote = customerQuotes.find((quote) => quote.slug === config.homepage_analytics_quote);

  return (
    <Layout.Root>
      <Layout.ContentContainer>
        <Stack.V spacing="6">
          <Header
            title="Unlock insights in minutes, make changes in real-time"
            description="Ashby Analytics unlocks true insights, by providing fully customizable reports and dashboards as well as custom alerts. Track all data points throughout your entire hiring process in real-time."
          />
          <Quote {...quote} size="small" color="heading" />
        </Stack.V>
      </Layout.ContentContainer>
      <Layout.MediaContainer>
        <ImageContainer
          css={{
            minWidth: "120%",
            borderRadius: "$1",
          }}
        >
          <NextImage
            priority
            src="/images/product/analytics-hero.png"
            layout="responsive"
            width={1386}
            height={756}
            alt="Custom Dashboard in Ashby"
          />
        </ImageContainer>
      </Layout.MediaContainer>
    </Layout.Root>
  );
};

const featuresList = [
  {
    ...modules[0],
    component: AshbyPlatformContent,
  },
  {
    ...modules[1],
    component: ATSContent,
  },
  {
    ...modules[2],
    component: SchedulingContent,
  },
  {
    ...modules[3],
    component: CRMContent,
  },
  {
    ...modules[4],
    component: AnalyticsContent,
  },
];
