/* eslint-igrone */
const path = require("path")
const webpack = require("webpack")
const PnpWebpackPlugin = require("pnp-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin")
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const safePostCssParser = require("postcss-safe-parser")
const ManifestPlugin = require("webpack-manifest-plugin")
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin")
const postcssFlexbugs = require("postcss-flexbugs-fixes")
const postcssPresetEnv = require("postcss-preset-env")
const WebpackBar = require("webpackbar")
const WatchMissingNodeModulesPlugin = require("react-dev-utils/WatchMissingNodeModulesPlugin")
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent")
const ModuleNotFoundPlugin = require("react-dev-utils/ModuleNotFoundPlugin")
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin")
const ForkTsCheckerWebpackPlugin = require("react-dev-utils/ForkTsCheckerWebpackPlugin")
const typescriptFormatter = require("react-dev-utils/typescriptFormatter")

const modules = require("./modules")
const getClientEnvironment = require("./env")
const paths = require("./paths")

const appPackageJson = require(paths.appPackageJson)
const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || "10000")
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false"
const imageRegex = [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
const scriptsRegex = /\.(js|jsx|tsx|ts)$/
const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/
const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== "false"

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development"
  const isEnvProduction = webpackEnv === "production"

  const publicPath = isEnvProduction ? paths.servedPath : isEnvDevelopment && 'http://localhost:8080/'

  const shouldUseRelativeAssetPaths = publicPath === "./"

  const publicUrl = isEnvProduction ? publicPath.slice(0, -1) : isEnvDevelopment && ""


  const env = getClientEnvironment(publicUrl)

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      isEnvDevelopment && require.resolve("style-loader"),
      isEnvProduction && {
        loader: MiniCssExtractPlugin.loader,
        options: shouldUseRelativeAssetPaths ? {
          publicPath: "../../",
        } : {},
      },
      {
        loader: require.resolve("css-loader"),
        options: cssOptions,
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
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      },
    ].filter(Boolean)
    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
      })
    }
    return loaders
  }

  const isSourceMap = shouldUseSourceMap ? "source-map" : false

  return {
    mode: isEnvProduction ? "production" : isEnvDevelopment && "development",
    bail: isEnvProduction,
    devtool: isEnvProduction ? isSourceMap : isEnvDevelopment && "eval-source-map",
    entry: [paths.appIndexJs].filter(Boolean),
    output: {
      path: isEnvProduction ? paths.appBuild : paths.appPublic,
      pathinfo: isEnvDevelopment,
      filename: isEnvProduction ?
        "js/bundle.js" : isEnvDevelopment && "js/bundle.js",
      futureEmitAssets: true,
      chunkFilename: isEnvProduction ?
        "static/js/[name].[contenthash:8].chunk.js" : isEnvDevelopment && "static/js/[name].chunk.js",
      publicPath,
      devtoolModuleFilenameTemplate: isEnvProduction ?
        (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, "/") : isEnvDevelopment &&
        ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, "/")),
      jsonpFunction: `webpackJsonp${appPackageJson.name}`,
      globalObject: "this",
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
          sourceMap: shouldUseSourceMap,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: shouldUseSourceMap ? {
              inline: false,
              annotation: true,
            } : false,
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
      // splitChunks: {
      //   chunks: "all",
      //   name: false,
      // },
      // runtimeChunk: {
      //   name: (entrypoint) => `runtime-${entrypoint.name}`,
      // },
    },
    resolve: {
      modules: ["node_modules", paths.appNodeModules].concat(modules.additionalModulePaths || []),
      extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
      alias: {
        ...(isEnvDevelopment ? {
            "react-dom": "@hot-loader/react-dom",
          } :
          undefined),
        "@features": path.resolve(paths.appSrc, "features"),
        "@api": path.resolve(paths.appSrc, "api"),
        "@pages": path.resolve(paths.appSrc, "pages"),
        "@lib": path.resolve(paths.appSrc, "lib"),
      },
      plugins: [PnpWebpackPlugin, new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson])],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      strictExportPresence: true,
      rules: [{
          parser: {
            requireEnsure: false,
          },
        },
        {
          oneOf: [{
              test: imageRegex,
              loader: require.resolve("url-loader"),
              options: {
                limit: imageInlineSizeLimit,
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
            {
              test: scriptsRegex,
              include: paths.appSrc,
              loader: require.resolve("babel-loader"),
              options: {
                cacheDirectory: true,
                cacheCompression: isEnvProduction,
                compact: isEnvProduction,
              },
            },
            {
              test: cssRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              }),
              sideEffects: true,
            },
            {
              test: sassRegex,
              use: getStyleLoaders({
                  importLoaders: 1,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent,
                  },
                },
                "sass-loader",
              ),
            },
            {
              loader: require.resolve("file-loader"),
              exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/, /\.(css|scss)$/],
              options: {
                name: "static/media/[name].[hash:8].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      // new HtmlWebpackPlugin(
      //   Object.assign({}, {
      //       inject: true,
      //       template: paths.appHtml,
      //     },
      //     isEnvProduction ? {
      //       minify: {
      //         removeComments: true,
      //         collapseWhitespace: true,
      //         removeRedundantAttributes: true,
      //         useShortDoctype: true,
      //         removeEmptyAttributes: true,
      //         removeStyleLinkTypeAttributes: true,
      //         keepClosingSlash: true,
      //         minifyJS: true,
      //         minifyCSS: true,
      //         minifyURLs: true,
      //       },
      //     } :
      //     undefined,
      //   ),
      // ),
      // isEnvProduction &&
      // shouldInlineRuntimeChunk &&
      // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new webpack.DefinePlugin(env.stringified),
      // isEnvDevelopment && new webpack.HotModuleReplacementPlugin(),
      isEnvDevelopment && new CaseSensitivePathsPlugin(),
      isEnvDevelopment && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      isEnvProduction &&
      new MiniCssExtractPlugin({
        filename: "css/admin.css",
        chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
      }),
      // new ManifestPlugin({
      //   fileName: "asset-manifest.json",
      //   publicPath,
      //   generate: (seed, files, entrypoints) => {
      //     const manifestFiles = files.reduce((manifest, file) => {
      //       manifest[file.name] = file.path
      //       return manifest
      //     }, seed)
      //     const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith(".map"))
      //
      //     return {
      //       files: manifestFiles,
      //       entrypoints: entrypointFiles,
      //     }
      //   },
      // }),
      // new ForkTsCheckerWebpackPlugin({
      //   typescript: resolve.sync("typescript", {
      //     basedir: paths.appNodeModules,
      //   }),
      //   async: isEnvDevelopment,
      //   useTypescriptIncrementalApi: true,
      //   checkSyntacticErrors: true,
      //   tsconfig: paths.appTsConfig,
      //   reportFiles: [
      //     "**",
      //     "!**/*.json",
      //     "!**/__tests__/**",
      //     "!**/?(*.)(spec|test).*",
      //     "!**/src/setupProxy.*",
      //     "!**/src/setupTests.*",
      //   ],
      //   watch: paths.appSrc,
      //   silent: true,
      //   formatter: typescriptFormatter,
      // }),
      new WebpackBar({
        name: "bloomchain",
      }),
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
