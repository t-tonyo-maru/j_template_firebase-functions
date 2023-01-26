/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['<rootDir>/src/__test__/**/?(*.)+(spec|test).+(ts|tsx|js)'], // src/__test__のみを対象とする。単体テストは除外する。
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'tsx', 'ts', 'd.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}