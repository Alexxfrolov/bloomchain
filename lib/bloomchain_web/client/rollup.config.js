import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
// import strip from "@rollup/plugin-strip"
import localResolve from "rollup-plugin-local-resolve"
import nodeGlobals from "rollup-plugin-node-globals"

const input = "src/index.js"
const extensions = ["js"]
const babelOptions = {
  extensions,
  exclude: "node_modules/**",
  // runtimeHelpers: true,
  configFile: "./babel.config.js",
}

const plugins = [
  babel(babelOptions),
  localResolve(),
  resolve(),
  nodeGlobals({ browser: true }),
  // strip(),
  commonjs(),
  terser(),
]

const OUTPUT_DATA = [
  {
    file: "../../../priv/static/customer/js/app.js",
    format: "iife",
  },
]

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input,
  output: {
    file,
    format,
    globals: {
      Highcharts: "Highcharts",
    },
    sourcemap: true,
  },
  plugins,
}))

export default config
