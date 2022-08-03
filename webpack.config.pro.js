const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const DotEnv = require("dotenv-webpack");
const autoprefixer = require("autoprefixer");

const config = {
  mode: "production",
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [{
          // inject CSS to page
          loader: MiniCssExtractPlugin.loader,
        }, {
          // translates CSS into CommonJS modules
          loader: "css-loader",
        }, {
          // Run postcss actions
          loader: "postcss-loader",
          options: {
            // `postcssOptions` is needed for postcss 8.x;
            // if you use postcss 7.x skip the key
            postcssOptions: {
              // postcss plugins, can be exported to postcss.config.js
              plugins() {
                return [
                  autoprefixer,
                ];
              },
            },
          },
        }, {
          // compiles Sass to CSS
          loader: "sass-loader",
        }],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  corejs: 3,
                },
              ],
              ["@babel/preset-react", {
                runtime: "automatic",
              }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new MiniCssExtractPlugin({ filename: "main.[fullhash].css" }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin(),
    new DotEnv(),
  ],
};

module.exports = config;
