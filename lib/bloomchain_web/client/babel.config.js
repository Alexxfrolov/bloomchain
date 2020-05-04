module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    [
      require("@babel/plugin-transform-destructuring").default,
      {
        loose: false,
      },
    ],
    [
      require("@babel/plugin-proposal-class-properties").default,
      {
        loose: true,
      },
    ],
    [
      require("@babel/plugin-proposal-object-rest-spread").default,
      {
        loose: true,
      },
    ],
    [
      require("@babel/plugin-transform-runtime").default,
      {
        version: require("@babel/runtime/package.json").version,
      },
    ],
    require("@babel/plugin-syntax-dynamic-import").default,
  ],
  ignore: [/@babel[\\|/]runtime/],
  env: {},
}
