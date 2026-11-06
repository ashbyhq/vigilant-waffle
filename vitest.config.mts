import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.{spec,test}.{js,ts,tsx}"],
    passWithNoTests: true,
  },
});
