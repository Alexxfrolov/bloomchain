import babel from "rollup-plugin-babel"
import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import { terser } from "rollup-plugin-terser"
import alias from "@rollup/plugin-alias"
import strip from "@rollup/plugin-strip"
import localResolve from "rollup-plugin-local-resolve"
import nodeGlobals from "rollup-plugin-node-globals"

const input = "src/index.js"
const extensions = ["js"]
const babelOptions = {
  extensions,
  exclude: "node_modules/**",
  runtimeHelpers: true,
  configFile: "./babel.config.js",
}

const plugins = [
  alias({
    resolve: extensions,
  }),
  babel(babelOptions),
  localResolve(),
  resolve({
    extensions,
  }),
  nodeGlobals(),
  strip(),
  commonjs(),
  terser(),
]

const OUTPUT_DATA = [
  {
    file: "../../../priv/static/customer/js/app.js",
    format: "cjs",
    env: {
      NODE_ENV: "production",
      BABEL_ENV: "cjs",
    },
  },
]

const config = OUTPUT_DATA.map(({ file, format, env }) => ({
  input,
  output: {
    file,
    format,
  },
  plugins: [...plugins, replace(env)],
}))

export default config
