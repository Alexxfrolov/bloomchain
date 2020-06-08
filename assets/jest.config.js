module.exports = {
  roots: ["<rootDir>"],
  collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}", "!**/*.d.ts"],
  setupFiles: ["react-app-polyfill/jsdom"],
  setupFilesAfterEnv: ["<rootDir>/admin/setup-tests.ts"],
  testMatch: [
    "<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/**/*.{spec,test}.{js,jsx,ts,tsx}",
  ],
  testEnvironment: "jest-environment-jsdom-fourteen",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/css-transform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
      "<rootDir>/config/jest/file-transform.js",
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^@pages(.*)$": "<rootDir>/admin/pages$1",
    "^@features(.*)$": "<rootDir>/admin/features$1",
    "^@lib(.*)$": "<rootDir>/admin/lib$1",
    "^@ui(.*)$": "<rootDir>/admin/ui$1",
    "^@api(.*)$": "<rootDir>/admin/api$1",
  },
  moduleFileExtensions: [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node",
  ],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
}
