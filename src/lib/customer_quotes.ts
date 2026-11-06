import { CmsFolderCollection, FolderCollection } from "./cms_collection";
import { CustomerChampion } from "./customer_champion";
import config from "../../config.json";

enum CustomerQuoteType {
  CustomerSupport = "customerSupport",
  ATS = "ats",
  CRM = "crm",
  Scheduling = "scheduling",
  Analytics = "analytics",
}

export enum CustomerQuoteLocation {
  Homepage = "homepage_quotes_order",
  CustomersPage = "customers_page_quotes_order",
  PricingPage = "pricing_page_quotes_order",
  RequestDemoPage = "request_demo_page_quote",
  HomepageATSTab = "homepage_ats_quote",
  HomepageSchedulingTab = "homepage_scheduling_quote",
  HomepageCRMTab = "homepage_crm_quote",
  HomePageAnalyticsTab = "homepage_analytics_quote",
  GrowthPageCustomerSuccess = "growth_page_cs_quote",
}

export interface CustomerQuote {
  readonly slug: string;
  readonly quoteText: string;
  readonly quoteAuthor: CustomerChampion;
  readonly type?: CustomerQuoteType;
}

const customerQuoteCollection = new CmsFolderCollection<CustomerQuote>({
  collection: FolderCollection.CustomerQuote,
});

export function fetchAllCustomerQuotes() {
  return customerQuoteCollection.getCollection();
}

export function fetchCustomerQuotesPerLocation(location: CustomerQuoteLocation) {
  const allCustomerQuotes = customerQuoteCollection.getCollection();
  const quotesPerLocation = config[location];
  const filteredQuotes = allCustomerQuotes.filter((quote) =>
    quotesPerLocation.includes(quote.slug),
  );
  return filteredQuotes.sort((a, b) => {
    let aIndex = quotesPerLocation.indexOf(a.slug);
    let bIndex = quotesPerLocation.indexOf(b.slug);

    if (aIndex < 0) {
      aIndex = filteredQuotes.length;
    }

    if (bIndex < 0) {
      bIndex = filteredQuotes.length;
    }

    return aIndex - bIndex;
  });
}
