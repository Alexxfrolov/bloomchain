const path = require("path")
const fs = require("fs")
const url = require("url")

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith("/")
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1)
  }
  if (!hasSlash && needsSlash) {
    return `${inputPath}/`
  }
  return inputPath
}
const getPublicUrl = (appPackageJson) => envPublicUrl || require(appPackageJson).homepage

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  // const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/")
  const servedUrl = ""
  return ensureSlash(servedUrl, true)
}

const moduleFileExtensions = ["js", "ts", "jsx", "tsx", "json"]

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((ext) =>
    fs.existsSync(resolveFn(`${filePath}.${ext}`)),
  )

  if (extension) {
    return resolveFn(`${filePath}.${extension}`)
  }

  return resolveFn(`${filePath}.js`)
}

module.exports = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp("../../../priv/static/admin"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveModule(resolveApp, "src/index"),
  appNodeModules: resolveApp("node_modules"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  proxySetup: resolveApp("src/setupProxy.js"),
  publicUrl: getPublicUrl(resolveApp("package.json")),
  servedPath: getServedPath(resolveApp("package.json")),
  appTests: resolveApp("__tests__"),
}

module.exports.moduleFileExtensions = moduleFileExtensions
