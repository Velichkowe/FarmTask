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
			template: 'public/index.html',
            filename: './index.html',
            inject: true,
            favicon: path.resolve(__dirname, 'public/favicon.ico')
		}),
		new  ModuleFederationPlugin({
			name: "components",
			filename: "remoteEntry.js",
			exposes: {
				"./showUsers": "./src/components/users/showAllUsers/showAllUsers",
                "./showFarms": "./src/components/farms/showFarms/showFarms",
                "./showFarmFields": "./src/components/fields/showFarmFields/showFarmFields",
                "./showFarmMachines": "./src/components/machines/showFarmMachines/showFarmMachines"
                // "./loginPage": "./src/components/loginPage/loginPage",
                // "./registerPage": "./src/components/registerPage/registerPage",
			},
			shared: {
                ...dependencies,
                'react': { 
                    singleton: true,
                    eager: true,
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