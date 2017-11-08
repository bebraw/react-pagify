import * as path from "path";

import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import CleanPlugin from "clean-webpack-plugin";
import merge from "webpack-merge";

import pkg from "./package.json";

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = __dirname;
const config = {
  paths: {
    readme: path.join(ROOT_PATH, "README.md"),
    dist: path.join(ROOT_PATH, "dist"),
    src: path.join(ROOT_PATH, "src"),
    demo: path.join(ROOT_PATH, "demo"),
    tests: path.join(ROOT_PATH, "tests"),
  },
  filename: "react-pagify",
  library: "ReactPagify",
};

process.env.BABEL_ENV = TARGET;

const demoCommon = {
  resolve: {
    extensions: [".js", ".jsx", ".css", ".png", ".jpg"],
  },
  module: {
    loaders: [
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            mimetype: "image/png",
          },
        },
        include: config.paths.demo,
      },
      {
        test: /\.jpg$/,
        use: "file-loader",
        include: config.paths.demo,
      },
    ],
  },
};

if (TARGET === "start") {
  module.exports = merge(demoCommon, {
    devtool: "eval-source-map",
    entry: {
      demo: config.paths.demo,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"development"',
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + " - " + pkg.description,
        template: "lib/index_template.ejs",

        // Context for the template
        name: pkg.name,
        description: pkg.description,
        demonstration: "",
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          include: [config.paths.demo, config.paths.src],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      host: process.env.HOST,
      port: process.env.PORT,
      stats: "errors-only",
    },
  });
}

if (TARGET === "gh-pages" || TARGET === "gh-pages:stats") {
  module.exports = merge(demoCommon, {
    entry: {
      app: config.paths.demo,
    },
    output: {
      path: path.join(ROOT_PATH, "gh-pages"),
      filename: "[name].[chunkhash].js",
      chunkFilename: "[chunkhash].js",
    },
    plugins: [
      new CleanPlugin(["gh-pages"], {
        verbose: false,
      }),
      new ExtractTextPlugin("[name].[chunkhash].css"),
      new webpack.DefinePlugin({
        // This affects the react lib size
        "process.env.NODE_ENV": '"production"',
      }),
      new HtmlWebpackPlugin({
        title: pkg.name + " - " + pkg.description,
        template: "lib/index_template.ejs",

        // Context for the template
        name: pkg.name,
        description: pkg.description,
        demonstration: "",
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: isVendor,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
      }),
    ],
    module: {
      loaders: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: "css-loader",
            fallback: "style-loader",
          }),
        },
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          include: [config.paths.demo, config.paths.src],
        },
      ],
    },
  });
}

function isVendor({ resource }) {
  return (
    resource && resource.indexOf("node_modules") >= 0 && resource.match(/\.js$/)
  );
}

// !TARGET === prepush hook for test
if (TARGET === "test" || TARGET === "test:tdd" || !TARGET) {
  module.exports = merge(demoCommon, {
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          use: "babel-loader",
          include: [config.paths.src, config.paths.tests],
        },
      ],
    },
  });
}

const distCommon = {
  devtool: "source-map",
  output: {
    path: config.paths.dist,
    libraryTarget: "umd",
    library: config.library,
  },
  entry: path.join(config.paths.src, "index.jsx"), // XXX: tidy up
  externals: {
    "lodash/merge": {
      commonjs: "lodash/merge",
      commonjs2: "lodash/merge",
      amd: ["lodash", "merge"],
      root: ["_", "merge"],
    },
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "React",
      root: "React",
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        use: "babel-loader",
        include: config.paths.src,
      },
    ],
  },
};

if (TARGET === "dist") {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + ".js",
    },
  });
}

if (TARGET === "dist:min") {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + ".min.js",
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  });
}
