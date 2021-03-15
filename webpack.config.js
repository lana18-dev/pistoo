const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './src/app.js',
        './src/app.scss',
    ],
    output: {
        path: `${__dirname}/www/dist`,
        filename: 'app.js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'raw-loader',
              },
   
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
            },
        ],
    },
    watchOptions: {
        ignored: [
            '/node_modules/',
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ 
            filename: 'app.css' 
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: [
                'www/index.html',
                'www/formulaire.html',
                'www/index.html',
                'www/map.html',
                'www/story.html',
                'www/enigme.html',

                // add other files to watch for hot reload
            ],
            server: {
                baseDir: 'www',
                middleware: (req, res, next) => (-1 === req.url.indexOf('.') && '/' !== req.url
                    ? res.end(res.writeHead(302, { Location: '/' }))
                    : next()),
            },
        }),
    ],
};