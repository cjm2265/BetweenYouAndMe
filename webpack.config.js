module.exports = options => {
    return {
        entry: "./frontend/react/App.js",
        output: {
            path: __dirname + "/frontend/js/",
            filename: 'react-bundle.js'
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                cacheDirectory: true,
                            }
                        }
                    ]
                }
            ]
        }
    }
}