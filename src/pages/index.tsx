import * as React from "react";
import metaTags from "../../content/metaTags.yml";
import { Heading } from "../components/Primitives/Heading";
import { CustomerLogosAnimated } from "../components/Logos/CustomerLogosAnimated";
import { Container, Section } from "../components/Primitives/Container";
import { Tween, SplitWords, Timeline } from "react-gsap";
import { Nav } from "../components/Nav/Nav";
import { Paragraph } from "../components/Primitives/Text";
import { Box } from "../components/Primitives/Box";
import { Stack } from "../components/Primitives/Stack";
import { GradientBackground, PatternBackground } from "../components/Primitives/GradientBackground";
import { Grid } from "../components/Primitives/Grid";
import { PlatformShowcase } from "../components/Homepage/PlatformShowcase";
import { CTA } from "../components/CTA";
import { ProductOffering, productOffering } from "../components/ProductOffering";
import { Footer } from "../components/Footer";
import { HomepageBanner } from "../components/Banner";
import { BasicMeta } from "../components/meta/BasicMeta";
import { OpenGraphMeta } from "../components/meta/OpenGraphMeta";
import { TwitterCardMeta } from "../components/meta/TwitterCardMeta";
import { HiringExcellence } from "../components/HiringExcellence";
import { AshbyHypeVideo } from "../components/AshbyHypeVideo";
import {
  CustomerQuote,
  CustomerQuoteLocation,
  fetchAllCustomerQuotes,
  fetchCustomerQuotesPerLocation,
} from "../lib/customer_quotes";
import { GetStaticProps } from "next";
import { CustomerProfile, fetchAllCustomers } from "../lib/customer_profile";
import { CustomerProfileContext } from "../components/Customers/CustomerProfileContext";
import { CustomerQuoteContext } from "../components/CustomerQuotesContext";
import { FeaturedQuotesTabs } from "../components/FeaturedQuotesTabs";

const Home = ({
  customerProfiles,
  homepageCustomerQuotes,
  allCustomerQuotes,
}: {
  customerProfiles: CustomerProfile[];
  homepageCustomerQuotes: CustomerQuote[];
  allCustomerQuotes: CustomerQuote[];
}) => {
  const tags = metaTags.index;

  return (
    <>
      <BasicMeta {...tags} />
      <TwitterCardMeta />
      <OpenGraphMeta {...tags} />
      <Timeline
        labels={[
          { label: "start", position: 0 },
          { label: "middle", position: 0.6 },
          { label: "end", position: 1.1 },
        ]}
      >
        <Box
          css={{
            "#site-header": {
              visibility: "hidden",
            },
          }}
        >
          <Tween from={{ autoAlpha: 0 }} duration={0.4} ease="power2.in" position={"start"}>
            <Nav />
          </Tween>
        </Box>
        <CustomerProfileContext.Provider value={customerProfiles}>
          <CustomerQuoteContext.Provider value={allCustomerQuotes}>
            <Box css={{ pt: "$11" }}>
              <Section size="2">
                <Stack.V spacing={{ "@initial": "10", "@tablet": "8" }}>
                  <Container>
                    <Stack.V spacing={{ "@initial": "10", "@tablet": "8" }}>
                      <Box
                        css={{
                          maxWidth: 700,
                          mx: "auto",
                          ta: "center",
                        }}
                      >
                        <Stack.V>
                          <Tween
                            from={{ autoAlpha: 0 }}
                            position="end"
                            duration={1.8}
                            ease="circ.easeInOut"
                          >
                            <Box
                              css={{
                                maxWidth: 500,
                                mx: "auto",
                                visibility: "hidden",
                              }}
                            >
                              <HomepageBanner />
                            </Box>
                          </Tween>
                          <Stack.V spacing="5">
                            <Heading
                              as="h1"
                              size="10"
                              css={{ overflow: "hidden", perspective: "800px" }}
                            >
                              <Tween
                                from={{
                                  autoAlpha: 0,
                                  y: "100%",
                                  rotationX: -45,
                                }}
                                stagger={0.12}
                                duration={1.1}
                                position="start+=0.2"
                                ease="expo.out"
                              >
                                <SplitWords
                                  wrapper={
                                    <Box
                                      as="span"
                                      css={{
                                        display: "inline-block",
                                        willChange: "transform, opacity",
                                        visibility: "hidden",
                                      }}
                                    />
                                  }
                                >
                                  Not just another ATS.
                                </SplitWords>
                              </Tween>
                            </Heading>
                            <Tween
                              from={{ autoAlpha: 0, y: 20 }}
                              position="middle"
                              duration={1}
                              ease="expo.out"
                            >
                              <Paragraph
                                size="4"
                                css={{
                                  visibility: "hidden",
                                  willChange: "transform, opacity",
                                }}
                              >
                                Unlock <Box as="strong">hiring excellence</Box> with Ashby’s{" "}
                                <Box as="strong">all-in-one</Box> recruiting platform. Empowering
                                ambitious teams from Seed to IPO.
                              </Paragraph>
                            </Tween>
                          </Stack.V>
                        </Stack.V>
                      </Box>
                      <CustomerLogosAnimated showHeader={false} />
                    </Stack.V>
                  </Container>
                  <PlatformShowcase />
                </Stack.V>
              </Section>
              {/* *----------------- Product -----------------* */}
              <Section size="2" css={{ position: "relative" }}>
                <GradientBackground color={"primary"} intensity="low" position="left">
                  <PatternBackground />
                </GradientBackground>
                <Container
                  size={"card"}
                  css={{
                    isolation: "isolate",
                    background: "$white",
                    padding: "clamp($6, 5vw, 72px)",
                    borderRadius: "$4",
                    boxShadow:
                      "0px 0px 1px rgb(20 20 21 / 12%), 0px 2px 36px -25px rgb(14 14 40 / 20%)",
                    "@tablet": {
                      borderRadius: 0,
                    },
                  }}
                >
                  <Stack.V>
                    <Stack.V spacing="4">
                      <Heading size="4">Product Tour</Heading>
                      <Heading size="8" css={{ maxWidth: 550 }}>
                        Products designed to help you excel at hiring{" "}
                        <Box as="span" css={{ color: "$textMuted" }}>
                          — no matter your company stage
                        </Box>
                      </Heading>
                    </Stack.V>
                    <Grid spacing="7" css={{ $$itemWidth: "300px" }}>
                      {productOffering.map((p) => (
                        <ProductOffering key={p.slug} {...p} />
                      ))}
                    </Grid>
                  </Stack.V>
                </Container>
              </Section>
              {/* *----------------- Quotes -----------------* */}
              <Section size="2">
                <Container>
                  <FeaturedQuotesTabs quotes={homepageCustomerQuotes} />
                </Container>
              </Section>
              {/* *----------------- Hype Video -----------------* */}
              <Section size="2">
                <Container>
                  <Stack.V>
                    <Heading size="8" css={{ ta: "center" }}>
                      Watch our launch video
                    </Heading>
                    <AshbyHypeVideo />
                  </Stack.V>
                </Container>
              </Section>
              <HiringExcellence />
              {/* *----------------- Call To Actions -----------------* */}
              <Section size="2">
                <Container>
                  <CTA />
                </Container>
              </Section>
            </Box>
          </CustomerQuoteContext.Provider>
        </CustomerProfileContext.Provider>
        <Box>
          <Footer />
        </Box>
      </Timeline>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      homepageCustomerQuotes: fetchCustomerQuotesPerLocation(CustomerQuoteLocation.Homepage),
      customerProfiles: fetchAllCustomers(),
      allCustomerQuotes: fetchAllCustomerQuotes(),
    },
  };
};
