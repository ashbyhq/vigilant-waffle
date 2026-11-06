import { NOOP } from "../utils/types";

export const IS_PROD = process.env.NODE_ENV !== "development";
/* eslint-disable no-console */
const NO_IN_BROWSER_DEBUG = process.env.NEXT_PUBLIC_IN_BROWSER_DEBUG !== "true" && IS_PROD;
const prefix = "[ASHBY]";

// Defining these in this `bind` style to preserve the line number of the calling site
const log = console.log.bind(console, prefix);
const warn = console.warn.bind(console, prefix);
const error = console.warn.bind(console, prefix);

/**
 * A wrapper for `console` methods, such as `console.log`. Wraps the `log`, `warn`, and `error` methods.
 *
 * Use this instead of `console` if you want to intentionally land statements in source.
 *
 * The default `Debug` methods will log in local development and where NEXT_PUBLIC_IN_BROWSER_DEBUG is set to "true"
 *
 * @example
 * // Log something in development and staging...
 * Debug.log("user id", user.id);
 *
 * @example
 * // Log something even in production...
 * Debug.everywhere.log("user id", user.id);
 */
export const Debug = {
  /** A `console.log` that will appear in development and on staging.  */
  log: NO_IN_BROWSER_DEBUG ? NOOP : log,
  /** A `console.warn` that will appear in development and on staging.  */
  warn: NO_IN_BROWSER_DEBUG ? NOOP : warn,
  /** A `console.error` that will appear in development and on staging.  */
  error: NO_IN_BROWSER_DEBUG ? NOOP : error,
};
