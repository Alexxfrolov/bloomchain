module.exports = {
  presets: [
    [
      require("@babel/preset-env").default,
      {
        useBuiltIns: "entry",
        corejs: 3,
        modules: false,
        exclude: ["transform-typeof-symbol"],
      },
    ],
  ],
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
    // [
    //   require("@babel/plugin-transform-runtime").default,
    //   {
    //     version: require("@babel/runtime/package.json").version,
    //   },
    // ],
  ],
  ignore: [/@babel[\\|/]runtime/],
  env: {},
}
