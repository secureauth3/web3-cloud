module.exports = {
    roots: [
      "src"
    ],
    clearMocks: true,
    coverageDirectory: "coverage",
    verbose: true,
    moduleNameMapper: {
      "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        ".(css|less|scss)$": "identity-obj-proxy",
    },
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/abi",
        "<rootDir>/src/stories",
        "<rootDir>/src/components/Form/index.js",
    ],
    testPathIgnorePatterns: [
        "<rootDir>/src/abi",
        "<rootDir>/src/stories",
        "<rootDir>/src/components/Form/index.js",
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