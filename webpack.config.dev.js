const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.[fullhash].js",
  },
  devServer: {
    port: 8080,
    open: false,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
  ],
};

module.exports = config;
