module.exports = {
  preset: 'react-native',
  setupFiles: [
    './jest/setupFile.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native' +
      '|@react-native-community' +
      '|@react-navigation' +
      '|react-navigation-header-buttons' +
      ')',
  ],
};
