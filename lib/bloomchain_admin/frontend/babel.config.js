const path = require("path")

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
    [
      require("@babel/preset-react").default,
      {
        development: true,
        useBuiltIns: true,
      },
    ],
    [require("@babel/preset-typescript").default],
  ],
  plugins: [
    [
      require("@babel/plugin-transform-destructuring").default,
      {
        loose: false,
        selectiveLoose: [
          "useState",
          "useEffect",
          "useContext",
          "useReducer",
          "useCallback",
          "useMemo",
          "useRef",
          "useImperativeHandle",
          "useLayoutEffect",
          "useDebugValue",
        ],
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
        useBuiltIns: true,
      },
    ],
    [
      require("@babel/plugin-transform-runtime").default,
      {
        corejs: false,
        regenerator: true,
        helpers: true,
        useESModules: true,
        absoluteRuntime: path.dirname(
          require.resolve("@babel/runtime/package.json"),
        ),
        version: require("@babel/runtime/package.json").version,
      },
    ],
    require("@babel/plugin-syntax-dynamic-import").default,
    require("@babel/plugin-proposal-numeric-separator").default,
  ],
  env: {
    test: {
      presets: [
        [
          require("@babel/preset-env").default,
          {
            targets: {
              node: "current",
            },
          },
        ],
      ],
      plugins: [
        [
          require("@babel/plugin-transform-runtime").default,
          {
            corejs: false,
            regenerator: true,
            helpers: false,
            useESModules: true,
            absoluteRuntime: path.dirname(
              require.resolve("@babel/runtime/package.json"),
            ),
            version: require("@babel/runtime/package.json").version,
          },
        ],
      ],
    },
  },
}
