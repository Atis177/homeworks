var webpack = require('webpack'),
    Clean = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/js/app'
    },

    output: {
        path: __dirname + "/dist",
        filename: 'js/[name].js'
    },

    watch: true,

    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jp?g|gif|png|svg)$/,
                loader: 'file?name=images/[name].[hash].[ext]'
            },
            {
                test: /\.(ttf|woff|eot)$/,
                loader: 'file?name=fonts/[name].[hash].[ext]'
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            '$': 'jquery',
            'window.jQuery': 'jquery'
        }),

        // Clean up build directory before every build
        new Clean(['./dist', './build'])
    ],

    devServer: {
        contentBase: './dist'
    }
};