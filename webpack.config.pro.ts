import PostCssPurgeCss from "@fullhuman/postcss-purgecss";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import DotEnv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import Glob from "glob";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Path from "path";
import PostCssFlexbugsFixes from "postcss-flexbugs-fixes";
import PostCssNormalize from "postcss-normalize";
import PostCssPresetEnv from "postcss-preset-env";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: Path.resolve(__dirname, "build"),
    filename: "main.[contenthash].js",
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
          loader: MiniCssExtractPlugin.loader,
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
                PostCssPurgeCss({
                  content: [Path.join(__dirname, "src", "index.html"), ...Glob.sync(Path.join(__dirname, "src", "/**/*.{ts,tsx}"), { nodir: true })],
                  skippedContentGlobs: [...Glob.sync(Path.join(__dirname, "node_modules", "/**"))],
                }),
                PostCssNormalize,
              ],
            },
            sourceMap: true,
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
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new MiniCssExtractPlugin({ filename: "main.[contenthash].css" }),
    new CleanWebpackPlugin(),
    new DotEnv(),
  ],
};

export default config;
