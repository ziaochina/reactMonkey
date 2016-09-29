var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var config = require('./web.config.js')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'antd'],
                    presets: ['react', 'es2015', 'stage-0']
                }
            }, {
                test: /\.less$/,
                loader: 'style!css?importLoaders=1!autoprefixer!less'
            }, {
                test: /\.(jpg|png|svg|woff|woff2)$/,
                exclude: /node_modules/,
                loader: "url-loader?limit=8192" //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
            }, {
                test: /\.(ttf|eot)$/,
                loader: 'file'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
            alias: {
                xComponent: __dirname + '/src/component/index.js',
                appLoader: __dirname + '/src/appLoader/index.js',
                dynamicComponent: __dirname + '/src/apps/dynamicUI/index.js',
                dynamicAction:  __dirname + '/src/apps/dynamicUI/action.js',
                dynamicReducer:  __dirname + '/src/apps/dynamicUI/reducer.js'
            }
    },

    plugins: [　
        new CopyWebpackPlugin([{
            context: './src/vendor',
            from: '**/*',
            to: './vendor'
        }, {
            context: './src/assets/iconfont',
            from: '**/*',
            to: 'iconfont'
        }]),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),
        //生成环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        /*
        //代码丑化
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap:false,
            mangle:false,
            compressor: {
                warnings: false
            }
        }),*/
        new HtmlWebpackPlugin({
            title: 'demo', //标题
            favicon: './src/assets/img/favicon.ico', //favicon路径
            filename: './index.html', //生成的html存放路径，相对于 path
            template: './src/index.html', //html模板路径
            inject: true, //允许插件修改哪些内容，包括head与body
            hash: true, //为静态资源生成hash值
            minify: { //压缩HTML文件
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        })
    ],

    postcss: function() {
        return [autoprefixer];
    },

};
