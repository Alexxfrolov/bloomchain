/* eslint-disable */
const path = require("path")
const fse = require("fs-extra")
const glob = require("glob")

const paths = require("../config/paths")

async function clearDir(path) {
  await fse.emptyDir(path)
  console.log("The static admin folder was successfully cleared")
}

async function ensureExistsDir(directory) {
  await fse.ensureDir(directory, {})
  console.log("The static admin folder is exists!")
}

async function copyBuildToTargetPath(path) {
  await fse.copy(paths.appBuild, path)
  console.log(`Copied ${paths.appBuild} to ${path}`)
}

async function changeBundleNameInTemplate() {
  glob(path.resolve(paths.appBuild + "/js/bundle.*.js"), {}, (err, files) => {
    const fileNames = files.map((file) => path.basename(file))
    fileNames.forEach((file) => {
      fse.readFile(
        "../../bloomchain_web/templates/layout/admin.html.eex",
        "utf8",
        function (err, data) {
          if (err) {
            return console.log(err)
          }
          const re = /bundle\.(.*?)\.js/g
          const result = data.replace(re, file)

          fse.writeFile(
            "../../bloomchain_web/templates/layout/admin.html.eex",
            result,
            "utf8",
            function (err) {
              if (err) return console.log(err)
            },
          )
          console.log("Bundle name changed successfully")
        },
      )
    })
  })
}

async function run() {
  try {
    const targetPath = path.resolve(
      __dirname + "../../../../../priv/static/admin",
    )

    await ensureExistsDir(targetPath)
    await changeBundleNameInTemplate()
    await clearDir(targetPath)
    await copyBuildToTargetPath(targetPath)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

run()
