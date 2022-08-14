/*
    ./webpack.config.js
*/
require("dotenv").config()
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const NODE_ENV ="production"
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '../public/index.html'), 
  filename: "index.html",
  inject: "body"
});

console.log("---------------------- WEBPACK ------------------")
console.info({
  environment: NODE_ENV
})
console.log("---------------------- WEBPACK ------------------")
module.exports = {
  devtool:  false,
  mode: NODE_ENV,//"production",
  watch:  false ,
  entry: {
    main: path.resolve(__dirname, 'index.js'),
  },
  output: {
    //path: path.resolve("dist")
    path: path.resolve(__dirname, '../build'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
              /*   modifyVars: {
                  '@ant-theme-file': "; @import '" + path.join(__dirname, '/theme/index.less',) + "'",
                }, */
                javascriptEnabled: true
              },
            },
          },
        ],
      },
      {
        parser: {
          amd: false
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [require("autoprefixer")]
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react']
          }
        }
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react']
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/react']
          }
        }
      }, 
      {
        test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'svg/'
            }
          }
        ]
      },    
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(resourcePath, resourceQuery) {
            return 'images/[name].[ext]';
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.js/,
        use: [
          { loader: 'babel-loader' }
        ]
      }
    ]
  },
  plugins: [HtmlWebpackPluginConfig],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 900000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '-',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        parallel: 10,
        test: /\.js($|\?)/i,
        sourceMap: true,
        uglifyOptions: {
          warnings: false,
          keep_fnames: false
        },
      })
    ]
  }
};
