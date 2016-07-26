module.exports = {
    entry: './src/Game.js',
    output: {
        path: './js',
        filename: 'minesweeper.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
