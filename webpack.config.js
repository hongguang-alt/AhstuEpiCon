const path = require('path')
//使用cross-env
const NODE_ENV = process.env.NODE_ENV === 'production';
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const FriendlyErrorWebpackPlugin = require('friendly-errors-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: '[name]_[hash:8].js',
        path: path.join(__dirname, 'dist')
    },
    mode: NODE_ENV ? 'production' : 'development',
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            use: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }, {
            test: /\.(png|jpg|svg|gif)$/,
            use: [{ loader: 'file-loader', options: { name: 'img/[name]_[hash:8].[ext]' } }]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: ['file-laoder']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            chunks: ['index'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: `[name]_[contenthash:8].css`
        }),
        new CleanWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new FriendlyErrorWebpackPlugin()
    ],
    devServer: NODE_ENV ? {} : {
        contentBase: './dist',
        hot: true,
        stats: 'errors-only'
    },
    stats: 'errors-only',
    devtool: NODE_ENV ? "none" : "cheap-module-eval-source-map"
}