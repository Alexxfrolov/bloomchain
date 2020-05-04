/* eslint-disable no-magic-numbers, unicorn/no-process-exit, no-console, prefer-template */
const errorOverlayMiddleware = require("react-dev-utils/errorOverlayMiddleware")
const evalSourceMapMiddleware = require("react-dev-utils/evalSourceMapMiddleware")
const noopServiceWorkerMiddleware = require("react-dev-utils/noopServiceWorkerMiddleware")
const ignoredFiles = require("react-dev-utils/ignoredFiles")
const fs = require("fs")
const paths = require("./paths")

const protocol = process.env.HTTPS === "true" ? "https" : "http"
const host = process.env.HOST || "0.0.0.0"

module.exports = (proxy, allowedHost) => ({
  disableHostCheck:
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === "true",
  compress: true,
  clientLogLevel: "none",
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: false,
  inline: false,
  publicPath: "/",
  quiet: true,
  // watchOptions: {
  //   ignored: ignoredFiles(paths.appSrc),
  // },
  https: protocol === "https",
  host,
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
  public: allowedHost,
  proxy: {
    ...proxy,
  },
  before(app, server) {
    if (fs.existsSync(paths.proxySetup)) {
      require(paths.proxySetup)(app)
    }
    app.use(evalSourceMapMiddleware(server))
    app.use(errorOverlayMiddleware())
    app.use(noopServiceWorkerMiddleware())
  },
})
