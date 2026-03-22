/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.spec.ts',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        isolatedModules: false,
      },
    ],
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '@domain/(.*)$': ['<rootDir>/src/domain/$1'],
    '@presentation/(.*)$': ['<rootDir>/src/presentation/$1'],
    '@application/(.*)$': ['<rootDir>/src/application/$1'],
    '@infra/(.*)$': ['<rootDir>/src/infra/$1'],
    '@test/(.*)$': ['<rootDir>/test/$1'],
    '@factories/(.*)$': ['<rootDir>/test/factories/$1'],
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/application/use-cases/**/*.ts',
    'src/domain/entities/**/*.ts',
    '!**/*.spec.ts',
    '!**/*.d.ts',
  ],
  coverageProvider: 'v8',
  coverageReporters: ['html', 'lcov', 'text', 'text-summary'],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  maxWorkers: 2,
  cache: true,
  cacheDirectory: '<rootDir>/.jest-cache',
};
