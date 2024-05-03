import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: 'node',
  forceExit: true,
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};

export default config;
