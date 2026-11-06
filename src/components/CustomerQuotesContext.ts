import React, { useContext } from "react";
import { CustomerQuote } from "../lib/customer_quotes";

export const CustomerQuoteContext = React.createContext<CustomerQuote[]>([]);

export const useCustomerQuotes = () => {
  const quotes = useContext(CustomerQuoteContext);

  if (quotes == null) {
    throw new Error("useCustomerQuotes must be used within a CustomerQuoteContext.Provider");
  }

  return quotes;
};
