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
      // 指定用于生成名称的分隔符
      automaticNameDelimiter: '~',
      // 设置为 all 可能特别强大，因为这意味着 chunk 可以在异步和非异步 chunk 之间共享
      chunks: 'all',
      // 按需加载时的最大并行请求数
      maxAsyncRequests: 30,
      // 入口点的最大并行请求数
      maxInitialRequests: 30,
      // 拆分前必须共享模块的最小 chunks 数
      minChunks: 1,
      //  仅在剩余单个 chunk 时生效
      minRemainingSize: 0,
      // 生成 chunk 的最小体积（以 bytes 为单位）
      minSize: 20480,
      // 告诉 webpack 尝试将大于 maxSize 个字节的 chunk 分割成较小的部分
      maxSize: 1024 * 1024,
      
      cacheGroups: {
        // defaultVendors: {
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
        // default: {
        //   minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true,
        // },
        commons: {
          test: /[\\/]node_modules[\\/]/,
          // cacheGroupKey here is `commons` as the key of the cacheGroup
          name(module, chunks, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            const allChunksNames = chunks.map((item) => item.name).join('~');
            return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          },
          chunks: 'all',
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
    assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
};
module.exports = merge(common, prodConfig);
