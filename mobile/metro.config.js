// const { getDefaultConfig } = require('expo/metro-config');
// const { withNativeWind } = require('nativewind/metro');

// const config = getDefaultConfig(__dirname);

// module.exports = withNativeWind(config, { input: './global.css' });



const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const projectRoot = __dirname;

const config = getDefaultConfig(projectRoot);

// 👇 Add support for external folders
config.watchFolders = [
  path.resolve(__dirname, '../packages') // allow Metro to watch that folder
];

// 👇 Tell Metro where to find the modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(projectRoot, '../../node_modules'),
];

module.exports = withNativeWind(config, { input: './global.css' });
