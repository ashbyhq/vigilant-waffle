const path = require("path");
const babel = require("@babel/core");
const { transform } = require("@svgr/core");
const jsx = require("@svgr/plugin-jsx");
const { cosmiconfigSync } = require("cosmiconfig");
const { optimize } = require("svgo");
const presetReact = require("@babel/preset-react");
const presetEnv = require("@babel/preset-env");
const presetTypeScript = require("@babel/preset-typescript");
const transformReactConstantElements = require("@babel/plugin-transform-react-constant-elements");

// Match @svgr/plugin-svgo's runtime configuration without installing its
// vulnerable deepmerge dependency.
const svgoExplorer = cosmiconfigSync("svgo", {
  searchPlaces: [
    "package.json",
    ".svgorc",
    ".svgorc.js",
    ".svgorc.json",
    ".svgorc.yaml",
    ".svgorc.yml",
    "svgo.config.js",
    "svgo.config.cjs",
    ".svgo.yml",
  ],
  transform: (result) => result && result.config,
  cache: true,
});

const getSvgoConfig = (config, state) => {
  if (config.svgoConfig) return config.svgoConfig;

  if (config.runtimeConfig) {
    const userConfig = svgoExplorer.search(state.filePath || process.cwd());
    if (userConfig) return userConfig;
  }

  const overrides = {};
  if (config.icon || config.dimensions === false) {
    overrides.removeViewBox = false;
  }
  if (config.native) {
    overrides.inlineStyles = { onlyMatchedOnce: false };
  }

  return {
    plugins: [{ name: "preset-default", params: { overrides } }, "prefixIds"],
  };
};

const svgo = (code, config, state) => {
  if (!config.svgo) return code;

  const result = optimize(code, {
    ...getSvgoConfig(config, state),
    path: state.filePath,
  });
  if (result.modernError) throw result.modernError;
  return result.data;
};

const babelOptions = {
  babelrc: false,
  configFile: false,
  presets: [
    babel.createConfigItem(presetReact, { type: "preset" }),
    babel.createConfigItem([presetEnv, { modules: false }], { type: "preset" }),
  ],
  plugins: [babel.createConfigItem(transformReactConstantElements)],
};

const typeScriptBabelOptions = {
  ...babelOptions,
  presets: [
    ...babelOptions.presets,
    babel.createConfigItem(
      [presetTypeScript, { allowNamespaces: true, allExtensions: true, isTSX: true }],
      { type: "preset" },
    ),
  ],
};

const transformSvg = async (contents, options, state) => {
  const { babel: transformWithBabel = true, ...config } = options;
  const jsCode = await transform(contents, config, state);
  if (!transformWithBabel) return jsCode;

  const result = await babel.transformAsync(
    jsCode,
    options.typescript ? typeScriptBabelOptions : babelOptions,
  );
  if (!result?.code) throw new Error("Error while transforming SVG using Babel");
  return result.code;
};

module.exports = function svgrLoader(contents) {
  if (this.cacheable) this.cacheable();

  const callback = this.async();
  const options = this.getOptions();
  const previousExport = (() => {
    if (contents.startsWith("export ")) return contents;
    const exportMatches = contents.match(/^module.exports\s*=\s*(.*)/);
    return exportMatches ? `export default ${exportMatches[1]}` : null;
  })();
  const state = {
    caller: {
      name: "@svgr/webpack",
      previousExport,
      defaultPlugins: [svgo, jsx],
    },
    filePath: path.normalize(this.resourcePath),
  };

  const complete = (source) => {
    transformSvg(source, options, state).then((content) => callback(null, content), callback);
  };

  if (!previousExport) {
    complete(contents);
    return;
  }

  this.fs.readFile(this.resourcePath, (error, result) => {
    if (error) {
      callback(error);
      return;
    }
    complete(String(result));
  });
};
