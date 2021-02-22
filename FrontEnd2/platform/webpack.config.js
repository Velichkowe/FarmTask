const path = require('path');
const  HtmlWebpackPlugin  =  require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const { dependencies } = require('./package.json');

module.exports = {
	mode: 'development',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, "dist"),
        port: 3001,
    },
    output: {
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [/node_modules/, /src\/types\//],
                options: {
                    presets: [require.resolve('@babel/preset-react'), require.resolve('@babel/preset-env')],
                    plugins: [
                        require.resolve('@babel/plugin-proposal-class-properties'),
                        require.resolve('@babel/plugin-syntax-dynamic-import')
                    ]
                }
            },
            {
                test: /\.m?js$/,
                type: "javascript/auto",
                resolve: {
                  fullySpecified: false,
                },
            },
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
				],
			},
            {
                test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                exclude: /node_modules/,
                use: ['file-loader?name=[name].[ext]']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
		]
    },
    resolve: {
        modules: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['*', '.js', '.jsx'],
    },
	plugins: [
		new HtmlWebpackPlugin({ 
            template: 'public/index.html',
            fileName: './index.html',
            favicon: path.resolve(__dirname, 'public/favicon.ico'),
            manifest: path.resolve(__dirname, 'public/manifest.json')
        }),
		new ModuleFederationPlugin({
			name: "platform",
			remotes: { 
            //     farm: "farm@http://localhost:3002/remoteEntry.js",
                components: "components@http://localhost:3002/remoteEntry.js"
            },
			shared: {
                ...dependencies,
                'react': {
                    eager: true,
                    singleton: true,
                    requiredVersion: dependencies.react
                },
                'react-dom': {
                    eager: true,
                    singleton: true,
                    requiredVersion: dependencies['react-dom']
                },
                '@apollo/client': {
                    // eager: true,
                    singleton: true,
                    requiredVersion: dependencies['@apollo/client']
                }
            }
		})
	]	
}