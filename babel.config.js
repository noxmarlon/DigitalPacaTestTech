module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [".jsx", ".ts", ".js", ".json", ".tsx"],
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};