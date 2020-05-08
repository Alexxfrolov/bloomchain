import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"
// import strip from "@rollup/plugin-strip"
import localResolve from "rollup-plugin-local-resolve"
import nodeGlobals from "rollup-plugin-node-globals"
// import postcss from "rollup-plugin-postcss"

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
  // postcss({
  //   extensions: [".css"],
  // }),
]

const OUTPUT_DATA = [
  {
    input: "src/index.js",
    file: "../../../priv/static/customer/js/app.js",
    format: "iife",
  },
  // {
  //   input: "src/app.css",
  //   file: "../../../priv/static/customer/css/app.css",
  // },
]

const config = OUTPUT_DATA.map(({ input, file, format }) => ({
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
