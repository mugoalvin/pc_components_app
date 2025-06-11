export default function (api) {
  api.cache(true);
  let plugins = ['babel-plugin-dotenv', 'react-native-paper/babel'];

  return {
    presets: [
      [
        'babel-preset-expo',
        { jsxImportSource: 'nativewind' }
      ],
      'nativewind/babel',
    ],

    plugins,
  };
};
