/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['./inversify.config.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
  testPathIgnorePatterns: [
    "<rootDir>/src/index.ts"
  ],
};