process.env.BABEL_ENV = "development"
process.env.NODE_ENV = "development"

process.on("unhandledRejection", (err) => {
  throw err
})

require("../config/env")

const fs = require("fs")
const chalk = require("react-dev-utils/chalk")
const webpack = require("webpack")
const WebpackDevServer = require("webpack-dev-server")
const clearConsole = require("react-dev-utils/clearConsole")
const checkRequiredFiles = require("react-dev-utils/checkRequiredFiles")
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require("react-dev-utils/WebpackDevServerUtils")
const openBrowser = require("react-dev-utils/openBrowser")
const {
  checkBrowsers
} = require("react-dev-utils/browsersHelper")

const paths = require("../config/paths")
const configFactory = require("../config/webpack.config")
const createDevServerConfig = require("../config/webpack-dev-server.config")

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

if (!checkRequiredFiles([paths.appIndexJs])) {
  process.exit(1)
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 8080
const HOST = process.env.HOST || "0.0.0.0"

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST),
      )}`,
    ),
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`,
  )
  console.log(
    `Learn more here: ${chalk.yellow("http://bit.ly/CRA-advanced-config")}`,
  )
  console.log()
}

const KILL_SIGNALS = ["SIGINT", "SIGTERM"]

checkBrowsers(paths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT)
  })
  .then((port) => {
    if (port == null) {
      return
    }
    const config = configFactory("development")
    const protocol = process.env.HTTPS === "true" ? "https" : "http"
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const appName = require(paths.appPackageJson).name
    const urls = prepareUrls(protocol, HOST, port)
    const devSocket = {
      warnings: (warnings) =>
        devServer.sockWrite(devServer.sockets, "warnings", warnings),
      errors: (errors) =>
        devServer.sockWrite(devServer.sockets, "errors", errors),
    }
    const compiler = createCompiler({
      appName,
      config,
      devSocket,
      urls,
      useYarn,
      webpack,
    })
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const proxySetting = require(paths.appPackageJson).proxy
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig,
    )
    const devServer = new WebpackDevServer(compiler, serverConfig)
    devServer.listen(port, HOST, (err) => {
      if (err) {
        console.log(err)
        return
      }
      if (isInteractive && !process.env.NO_CLEAR) {
        clearConsole()
      }
      console.log(chalk.cyan("Starting the development server...\n"))
      // openBrowser(urls.localUrlForBrowser)
    })

    KILL_SIGNALS.forEach((sig) => {
      process.on(sig, () => {
        devServer.close()
        process.exit()
      })
    })
  })
  .catch((error) => {
    if (error && error.message) {
      console.log(error.message)
    }
    process.exit(1)
  })
