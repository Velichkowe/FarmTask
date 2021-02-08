const path = require('path');
const HtmlWebpackPlugin  =  require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const dependencies = require("./package.json").dependencies;

module.exports = {
    entry: "./src/index",
	mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 3002,
    },
    output: {
        publicPath: "auto"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
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
            }
        ],
    },
    resolve: {
        modules: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['*', '.js', '.jsx'],
    },
	plugins: [
		new  HtmlWebpackPlugin({ 
			template: "./public/index.html" 
		}),
		new  ModuleFederationPlugin({
			name: "components",
			filename: "remoteEntry.js",
			exposes: {
				"./showUsers": "./src/components/users/showAllUsers",
                "./header": "./src/components/header/header"
			},
			shared: {
                ...dependencies,
                'react': { 
                    singleton: true,
                    eager: true,
                    // requiredVersion: dependencies.react
                },
                'react-dom': {
                    eager: true,
                    singleton: true,
                    // requiredVersion: dependencies['react-dom']
                },
                '@apollo/client': {
                    singleton: true,
                    requiredVersion: dependencies['@apollo/client']
                }
            }
		})
	]	
}