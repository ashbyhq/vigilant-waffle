import React, { useContext } from "react";
import { CustomerProfile } from "../../lib/customer_profile";

export const CustomerProfileContext = React.createContext<CustomerProfile[]>([]);

export const useCustomerProfiles = () => {
  const profiles = useContext(CustomerProfileContext);

  if (profiles == null) {
    throw new Error("useCustomerProfiles must be used within a CustomerProfileContext.Provider");
  }

  return profiles;
};
