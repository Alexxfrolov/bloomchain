/* eslint-disable no-magic-numbers, unicorn/no-process-exit, no-console, prefer-template */
const fs = require("fs")
const path = require("path")
const dotenv = require("dotenv")
const dotenvExpand = require("dotenv-expand")

const paths = require("./paths")

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve("./paths")]

const { NODE_ENV } = process.env
if (!NODE_ENV) {
  throw new Error(
    "The NODE_ENV environment variable is required but was not specified.",
  )
}

const dotenvFiles = [
  `${paths.dotenv}.${NODE_ENV}.local`,
  `${paths.dotenv}.${NODE_ENV}`,
  NODE_ENV !== "test" && `${paths.dotenv}.local`,
  paths.dotenv,
].filter(Boolean)

dotenvFiles.forEach((dotenvFile) => {
  if (fs.existsSync(dotenvFile)) {
    dotenvExpand(
      dotenv.config({
        path: dotenvFile,
      }),
    )
  }
})

const appDirectory = fs.realpathSync(process.cwd())
process.env.NODE_PATH = (process.env.NODE_PATH || "")
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => path.resolve(appDirectory, folder))
  .join(path.delimiter)

const REACT_APP = /^REACT_APP_/i

function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter((key) => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        // eslint-disable-next-line no-param-reassign
        env[key] = process.env[key]
        return env
      },
      {
        NODE_ENV: process.env.NODE_ENV || "development",
        PUBLIC_URL: publicUrl,
      },
    )
  const stringified = {
    "process.env": Object.keys(raw).reduce((env, key) => {
      // eslint-disable-next-line no-param-reassign
      env[key] = JSON.stringify(raw[key])
      return env
    }, {}),
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment
