const yaml = require("js-yaml");
const { readFileSync, writeFileSync } = require("fs");

const CMS_CONFIG_PATH = "public/admin/config.yml";
const protectedBranchNames = ["develop", "main"];

function isBranchValid(currentBranch) {
  return (
    currentBranch != null &&
    typeof currentBranch === "string" &&
    currentBranch.length !== 0 &&
    !protectedBranchNames.includes(currentBranch)
  );
}

const configFileContent = readFileSync(CMS_CONFIG_PATH, "utf8");
const configData = yaml.load(configFileContent, {
  schema: yaml.JSON_SCHEMA,
});

// Branch Netlify is deploying and is accessible during build.
const currentBranch = process.env.HEAD;

if (isBranchValid(currentBranch)) {
  configData.backend.branch = currentBranch;
  configData.site_url = process.env.DEPLOY_PRIME_URL;
  writeFileSync(CMS_CONFIG_PATH, yaml.dump(configData));
}
