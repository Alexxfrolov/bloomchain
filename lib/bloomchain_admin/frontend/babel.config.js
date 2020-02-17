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
      },
    ],
    require("@babel/plugin-syntax-dynamic-import").default,
  ]
}
