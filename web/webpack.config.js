var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var SpritesmithPlugin = require('webpack-spritesmith');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const devEnv = require('../config/dev.env');
const prodEnv= require('../config/prod.env');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: 'dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
	  {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
	modules: ["node_modules", "src/assets"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  plugins: [
		new ExtractTextPlugin("main.css"),
		new SpritesmithPlugin({
		   src: {
			   cwd: path.resolve(__dirname, 'src/assets/sprites'),
			   glob: '*.png'
		   },
		   target: {
			   image: path.resolve(__dirname, 'src/assets/all.png'),
			   css: path.resolve(__dirname, 'src/assets/sprite.scss')
		   },
		   apiOptions: {
			   cssImageRef: "~all.png"
		   }
	   })
  ],
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': prodEnv
    }),
    new UglifyJsPlugin({
            "uglifyOptions":
                {
                    compress: {
                        warnings: false
                    },
                    sourceMap: true
                }
        }
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': devEnv
    })
  ]);
}
// development
