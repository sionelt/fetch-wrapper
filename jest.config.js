module.exports = {
  collectCoverageFrom: [
    '!**/__tests__/**',
    '!**/jest.*.js',
  ],
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 0,
      lines: 1,
      functions: 1,
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
