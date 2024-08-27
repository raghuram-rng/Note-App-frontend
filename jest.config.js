module.exports = {
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|other-module-to-transform).+\\.js$',
  ],
  testEnvironment: 'jsdom',
};
