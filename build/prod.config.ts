import * as Webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { merge } from 'webpack-merge';
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
	mode: 'production',
	plugins: [
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		// 分离css
		new MiniCssExtractPlugin(),
		new FileManagerPlugin({
			events: {
				onEnd: {
					archive: [{ source: './dist', destination: './zip/dist.zip' }],
				},
			},
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					drop_console: true,
				},
			},
		}),
	],
	module: {
		rules: [
			{
				test: /\.[j|t]s?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
			},
			{
				test: /\.css|sass|scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [['postcss-preset-env', {}]],
							},
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
		],
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				common: {
					test: /(vue|vue-router|core-js|axios)/,
					// minChunks: 2,
					filename: 'common.js',
					chunks: 'all',
				},
				vendor: {
					priority: 1,
					test: /node_modules/,
					chunks: 'initial',
					minSize: 0,
					minChunks: 2,
					name: 'vendor.js',
				},
			},
		},
	},
};

const basicConfig = require('./base.config')()
module.exports = () => merge(basicConfig, config)
