import { CSS } from "@stitches/react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { encode } from "querystring";
import { ChildrenProps } from "../utils/props";
import { Box } from "./Primitives/Box";

interface NextLinkProps extends ChildrenProps, LinkProps {
  perserveParams?: boolean;
  css?: CSS;
  asChild?: boolean;
}

const PreserveParams = [
  "partner",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

export const NextLink = ({
  children,
  perserveParams: _perserveParams,
  href,
  css,
  asChild,
  ...rest
}: NextLinkProps) => {
  const router = useRouter();
  const oldSearchParams = new URLSearchParams(encode(router.query));

  const paramsToPreserve = PreserveParams.filter((param) => oldSearchParams.has(param));

  const calculateTo = () => {
    if (paramsToPreserve.length < 1) {
      return href;
    }

    // href could be a string or a Url. convert everything to a string.
    const newHref = typeof href === "string" ? href : href.pathname;
    const newSearchParams = new URLSearchParams();

    // Using "/" as a proxy for internal links. Don't pass off our utm params to external websites.
    if (newHref.charAt(0) !== "/") {
      return href;
    }

    paramsToPreserve.forEach((param) => newSearchParams.append(param, oldSearchParams.get(param)));

    return `${newHref}?${newSearchParams.toString()}`;
  };

  return (
    <Link href={calculateTo()} passHref {...rest}>
      {asChild ? (
        children
      ) : (
        <Box as="a" css={{ textDecoration: "none", color: "initial", ...css }}>
          {children}
        </Box>
      )}
    </Link>
  );
};
