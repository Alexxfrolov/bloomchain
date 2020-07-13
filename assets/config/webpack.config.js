const path = require("path")
const glob = require("glob")
const webpack = require("webpack")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const postcssFlexbugs = require("postcss-flexbugs-fixes")
const postcssPresetEnv = require("postcss-preset-env")
const safePostCssParser = require("postcss-safe-parser")
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin")
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

const paths = require("./paths")

const cssRegex = /\.[s]?css$/
const scriptsRegex = /\.(js|jsx|tsx|ts)$/

module.exports = (env, options) => {
  const isEnvDevelopment = options.mode !== "production"
  const isEnvProduction = options.mode === "production"

  return {
    bail: isEnvProduction,
    devtool: isEnvProduction
      ? "source-map"
      : isEnvDevelopment && "eval-source-map",
    entry: {
      "customer/charts": path.resolve("./customer/src/charts.js"),
      "customer/bundle": path.resolve("./customer/src/app.js"),
      "admin/bundle": path.resolve("./admin/index.tsx"),
    },
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "../../priv/static"),
      publicPath: "",
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: {
              inline: false,
              annotation: true,
            },
          },
          cssProcessorPluginOptions: {
            preset: [
              "default",
              {
                minifyFontValues: {
                  removeQuotes: false,
                },
              },
            ],
          },
        }),
      ],
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules],
      extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
      alias: {
        "@ui": path.resolve(paths.appSrc, "ui"),
        "@features": path.resolve(paths.appSrc, "features"),
        "@api": path.resolve(paths.appSrc, "api"),
        "@pages": path.resolve(paths.appSrc, "pages"),
        "@lib": path.resolve(paths.appSrc, "lib"),
      },
      plugins: [
        PnpWebpackPlugin,
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
      ],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          parser: {
            requireEnsure: false,
          },
        },
        // {
        //   test: /\.(ts|tsx)$/,
        //   enforce: "pre",
        //   use: [
        //     {
        //       options: {
        //         cache: false,
        //         formatter: require.resolve("react-dev-utils/eslintFormatter"),
        //         eslintPath: require.resolve("eslint"),
        //         resolvePluginsRelativeTo: __dirname,
        //       },
        //       loader: require.resolve("eslint-loader"),
        //     },
        //   ],
        //   include: paths.appSrc,
        // },
        {
          oneOf: [
            {
              test: scriptsRegex,
              exclude: paths.appNodeModules,
              loader: require.resolve("babel-loader"),
              options: {
                plugins: [
                  [
                    require.resolve("babel-plugin-named-asset-import"),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                        },
                      },
                    },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                compact: isEnvProduction,
              },
            },
            {
              test: cssRegex,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: require.resolve("css-loader"),
                },
                {
                  loader: require.resolve("postcss-loader"),
                  options: {
                    ident: "postcss",
                    plugins: () => [
                      postcssFlexbugs,
                      postcssPresetEnv({
                        autoprefixer: {
                          flexbox: "no-2009",
                        },
                        stage: 3,
                      }),
                    ],
                  },
                },
              ],
              sideEffects: true,
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/",
                esModule: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new ModuleNotFoundPlugin(paths.appPath),
      // isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment &&
        new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new MiniCssExtractPlugin({ filename: "[name].css" }),
      new CopyPlugin({
        patterns: [{ from: "./customer/static", to: "./customer" }],
      }),
      // new ForkTsCheckerWebpackPlugin({
      //   typescript: resolve.sync("typescript", {
      //     basedir: paths.appNodeModules,
      //   }),
      //   async: isEnvDevelopment,
      //   useTypescriptIncrementalApi: true,
      //   checkSyntacticErrors: true,
      //   resolveModuleNameModule: process.versions.pnp
      //     ? `${__dirname}/pnpTs.js`
      //     : undefined,
      //   resolveTypeReferenceDirectiveModule: process.versions.pnp
      //     ? `${__dirname}/pnpTs.js`
      //     : undefined,
      //   tsconfig: paths.appTsConfig,
      //   reportFiles: [
      //     "**",
      //     "!**/__tests__/**",
      //     "!**/?(*.)(spec|test).*",
      //     "!**/src/setupTests.*",
      //   ],
      //   silent: true,
      //   formatter: isEnvProduction ? typescriptFormatter : undefined,
      // }),
    ].filter(Boolean),
    node: {
      module: "empty",
      dgram: "empty",
      dns: "mock",
      fs: "empty",
      net: "empty",
      tls: "empty",
      child_process: "empty",
    },
    performance: false,
  }
}
