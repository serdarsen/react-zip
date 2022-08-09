import { CleanWebpackPlugin } from "clean-webpack-plugin";
import DotEnv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Path from "path";
import PostCssFlexbugsFixes from "postcss-flexbugs-fixes";
import PostCssNormalize from "postcss-normalize";
import PostCssPresetEnv from "postcss-preset-env";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: Path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", {
                runtime: "automatic",
              }],
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader",
        }, {
          loader: "css-loader",
          options: {
            importLoaders: 2,
          },
        }, {
          loader: "postcss-loader",
          options: {
            postcssOptions: {
              ident: "postcss",
              syntax: "postcss-scss",
              plugins: [
                PostCssFlexbugsFixes,
                PostCssPresetEnv({
                  autoprefixer: {
                    flexbox: "no-2009",
                  },
                  stage: 3,
                }),
                PostCssNormalize,
              ],
            },
            sourceMap: false,
          },
        }, {
          loader: "sass-loader",
        }],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CleanWebpackPlugin(),
    new DotEnv(),
  ],
  devtool: "inline-source-map",
  devServer: {
    static: Path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: false,
  },
};

export default config;
