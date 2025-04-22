const path = require("path");

module.exports = {
  // Where to resolve modules (like our shared package itself)
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"], // Allow these file extensions
    alias: {
      // Optional: Create aliases for commonly imported directories if not using tsconfig paths globally
      // '@shared': path.resolve(__dirname, '../shared/src/'),
    },
  },
  module: {
    rules: [
      // Rule for JavaScript/TypeScript files using Babel or ts-loader
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Use babel-loader with presets for TS, React, modern JS
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      // Rule for CSS files
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // style-loader injects, css-loader processes @import etc.
      },
      // Add rules for other asset types (images, fonts, SVGs) if needed
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // Webpack 5 asset module
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // Common plugins can go here, but ModuleFederationPlugin and HtmlWebpackPlugin
  // should go in the individual application configs.
  plugins: [
    // Common plugins if any
  ],
};
