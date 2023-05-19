const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
  "resolve": { 
    "alias": { 
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",     // Must be below test-utils
      "react/jsx-runtime": "preact/jsx-runtime",
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src", "components"),
      "@controllers": path.resolve(__dirname, "src", "controllers"),
      "@style": path.resolve(__dirname, "src", "global-styles"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        // loader: "babel-loader",
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: isProduction ? [MiniCssExtractPlugin.loader, "css-loader"] : [stylesHandler, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: isProduction ? [MiniCssExtractPlugin.loader, "css-loader", {loader: "sass-loader", options: { implementation: require.resolve("sass") }}] : [stylesHandler, "css-loader", {loader: "sass-loader", options: { implementation: require.resolve("sass") }}],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
    ],
  },
  optimization: {
    minimize: false,
    chunkIds: 'named',
    moduleIds: 'named'
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
