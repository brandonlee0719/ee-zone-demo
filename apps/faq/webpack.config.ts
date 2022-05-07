import * as webpack from 'webpack';
const postcssPresetEnv = require('postcss-preset-env');

export default (config): webpack.Configuration => {
  patchWebpackPostcssPlugins(config, [
    postcssPresetEnv({
      stage: 1,
    }),
  ]);
  return config;
}

function patchWebpackPostcssPlugins(webpackConfig, addPlugins) {
  const webpackCssRules = webpackConfig.module.rules.filter((x) =>
    x.test.toString().includes('css')
  );
  if (!webpackCssRules) {
    console.warn('[ng-webpack-ext.config.js]: No scss rule found');
  } else {
    for (const webpackScssRule of webpackCssRules) {
      const postcssLoader = webpackScssRule.use.find(
        (x) => x.loader && x.loader.includes('postcss-loader')
      );
      const pluginFunc = postcssLoader.options.plugins;
      const newPluginFunc = function () {
        let plugins = pluginFunc.apply(this, arguments);
        plugins = plugins.concat(addPlugins);
        return plugins;
      };
      postcssLoader.options.plugins = newPluginFunc;
    }
  }
}
