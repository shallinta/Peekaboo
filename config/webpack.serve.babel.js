/**
 * webpack开发环境配置文件
 * @author Joe Zhong <zhong.zhi@163.com>
 * @module config/webpack.serve.babel
 */

import path from 'path';
import { isString, isArray, isObject, isFunction } from 'util';
import webpack from 'webpack';
import DashboardPlugin from 'webpack-dashboard/plugin';
import OpenBrowserPlugin from 'open-browser-webpack-plugin';
import ProfilePlugin from 'packing-profile-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import postcssCssnext from 'postcss-cssnext';
import packing, { assetExtensions, localhost, port } from './packing';

const {
  src,
  assets,
  assetsDist,
  entries
} = packing.path;

// js输出文件保持目录名称
const JS_DIRECTORY_NAME = 'js';
// js输出文件保持目录名称
const CSS_DIRECTORY_NAME = 'css';

 /**
  * 给所有入口js加上HRM的clientjs
  * @param {string|array|object} entry 页面入口列表
  * @param {boolean} reload 是否强制刷新页面
  * @return {array}
  */
const pushClientJS = (entry, reload) => {
  let clientJS = 'webpack-hot-middleware/client';
  if (reload) {
    clientJS += '?reload=true';
  }
  let newEntry = entry;
  if (isString(newEntry)) {
    newEntry = [clientJS, newEntry];
  } else if (isArray(newEntry)) {
    newEntry.unshift(clientJS);
  } else if (isObject(newEntry)) {
    Object.keys(newEntry).forEach((key) => {
      newEntry[key] = pushClientJS(newEntry[key], reload);
    });
  }
  return newEntry;
};

/**
 * 返回样式loader字符串
 * @param {string} cssPreprocessor css预处理器类型
 * @return {string}
 */
const styleLoaderString = (cssPreprocessor) => {
  const query = cssPreprocessor ? `!${cssPreprocessor}` : '';
  return ExtractTextPlugin.extract('style', `css?importLoaders=2!postcss${query}`);
};

/**
 * 生成webpack配置文件
 * @param {object} options 特征配置项
 * @return {object}
 */
const webpackConfig = (options) => {
  const projectRootPath = path.resolve(__dirname, '../');
  const assetsPath = path.resolve(projectRootPath, assetsDist);
  const context = path.resolve(__dirname, '..');
  const devtool = options.devtool;

  let entry = isFunction(entries) ? entries() : entries;

  const output = {
    chunkFilename: `${JS_DIRECTORY_NAME}/[name].js`,
    filename: `${JS_DIRECTORY_NAME}/[name].js`,
    // prd环境静态文件输出地址
    path: assetsPath,
    // dev环境下数据流访问地址
    publicPath: ''
  };

  const moduleConfig = {
    loaders: [
      { test: /\.js?$/i, loaders: ['babel', 'eslint'], exclude: /node_modules/ },
      { test: /\.css$/i, loader: styleLoaderString() },
      {
        test: new RegExp(`\.(${assetExtensions.join('|')})$`, 'i'),
        loader: `file?name=[path][name].[ext]&context=${assets}&emitFile=false&limit=1`
      }
    ]
  };

  const postcss = () => [postcssCssnext];

  const resolve = {
    modulesDirectories: [src, assets, 'node_modules']
  };

  const plugins = [];

  if (options.hot) {
    entry = pushClientJS(entry, options.reload);
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
    // moduleConfig.loaders.unshift({
    //   test: /\.js$/,
    //   loader: 'react-hot',
    //   exclude: nodeModuleReg
    // });
  }

  if (!process.env.DISABLE_OPEN_BROWSER) {
    plugins.push(
      new OpenBrowserPlugin({ url: `http://${localhost}:${port.dev}` })
    );
  }

  plugins.push(
    new ProfilePlugin({
      profile: `src/profiles/${process.env.NODE_ENV}`
    }),
    new webpack.DefinePlugin({
      // '__DEVTOOLS__': true,
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CDN_ROOT: JSON.stringify(process.env.CDN_ROOT)
      }
    }),
    new DashboardPlugin(),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin(`${CSS_DIRECTORY_NAME}/[name].css`, {
      allChunks: true
    }),
  );

  // 从配置文件中获取并生成webpack打包配置
  if (packing.commonChunks) {
    const chunkKeys = Object.keys(packing.commonChunks);
    chunkKeys.forEach((key) => {
      entry[key] = packing.commonChunks[key];
    });

    // 扩展阅读 http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({ names: chunkKeys })
    );
  }

  return {
    context,
    entry,
    output,
    module: moduleConfig,
    postcss,
    resolve,
    plugins,
    devtool
  };
};

export default webpackConfig({
  hot: true,
  // 检测到module有变化时，强制刷新页面
  reload: false,
  devtool: 'eval'
});
