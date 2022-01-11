module.exports = {
    roots: [
      "src"
    ],
    clearMocks: true,
    coverageDirectory: "coverage",
    verbose: true,
    moduleNameMapper: {
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/abi",
        "<rootDir>/src/stories",
        "<rootDir>/src/components/Connection/index.js",
    ],
    testPathIgnorePatterns: [
        "<rootDir>/src/abi",
        "<rootDir>/src/stories",
        "<rootDir>/src/components/Connection/index.js",
    ],
    coverageReporters: [
        "json",
        "text",
        "lcov",
        "clover"
    ],
    coverageThreshold: {
      global: {
        "branches": 100,
        "functions": 100,
        "lines": 100,
        "statements": 100
      }
    },
    moduleFileExtensions: [
      "js",
      "json",
      "jsx",
      "ts",
      "tsx",
      "node"
    ],
    testEnvironment: "jest-environment-jsdom",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  };