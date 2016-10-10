const webpack = require('webpack');

module.exports = {
    entry: './src/main.vue',
    output: {
        path: './public',
        filename: 'minesweeper.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            mangle: true
        })
    ],
    resolve: {
    alias: {vue: 'vue/dist/vue.js'}
},
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                'presets': ['es2015'],
                'comments': false
            }
        }, {
            test: /\.vue$/,
            loader: 'vue' 
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
            ]
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    }
};
