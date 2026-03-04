const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { merge } = require('webpack-merge');
const common = require('./webpack.base');
const DefaultSetting = require('./setting');

/** @type {import('webpack').Configuration} */
const prodConfig = {
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.(css|less)$/,
  //       use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
  //     },
  //   ],
  // },

  optimization: {
    minimize: true,
    minimizer: [
      // js
      new TerserPlugin({
        terserOptions: {
          warnings: false,
          compress: {
            comparisons: false,
          },
          parse: {},
          mangle: true,
          output: {
            comments: false,
            ascii_only: true,
          },
        },
      }),

      // css
      // new CssMinimizerPlugin(),
    ],
    nodeEnv: 'production',
    moduleIds: 'deterministic',
    sideEffects: true,
    concatenateModules: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 30,
      // 入口点的最大并行请求数（降低以减少初始请求数）
      maxInitialRequests: 20,
      // 生成 chunk 的最小体积（以 bytes 为单位）
      minSize: 20000,
      // 告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分
      maxSize: 244000, // 244KB，符合 webpack 推荐限制

      cacheGroups: {
        // React 核心库单独打包（变化频率低，可以长期缓存）
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
          name: 'react-vendor',
          priority: 40,
          reuseExistingChunk: true,
        },
        // Antd 单独打包（体积较大）
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: 'antd-vendor',
          priority: 30,
          reuseExistingChunk: true,
        },
        // React Router 相关
        reactRouter: {
          test: /[\\/]node_modules[\\/](react-router|history)[\\/]/,
          name: 'router-vendor',
          priority: 25,
          reuseExistingChunk: true,
        },
        // 其他第三方库
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          reuseExistingChunk: true,
          minChunks: 1,
        },
        // 公共代码
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    // MiniCss
    new MiniCssExtractPlugin(),

    // Gzip
    DefaultSetting.Gzip &&
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),

    // Analyzer
    DefaultSetting.Analyzer &&
      new BundleAnalyzerPlugin({
        analyzerPort: 9999,
      }),
  ].filter(Boolean),

  performance: {
    // 提高入口点大小限制，因为我们已经通过代码分割优化了
    maxEntrypointSize: 512000, // 500KB
    maxAssetSize: 512000, // 500KB
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};
module.exports = merge(common, prodConfig);
