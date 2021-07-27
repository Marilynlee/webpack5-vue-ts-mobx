import * as path from 'path';
import * as Webpack from 'webpack';
import { merge } from 'webpack-merge';

const config = {
	mode: 'development',
	devtool:
		process.env.NODE_ENV === 'development' ? 'eval-source-map' : 'source-map',
	module: {
		rules: [
			{
				test: /\.[j|t]s?$/,
				exclude: /node_modules/,
				include: [path.resolve(__dirname, '../src')],
				use: [
					{
						loader: 'babel-loader',
						options: {
							compact: false,
							cacheDirectory: true,
						},
					},
				],
			},
			{
				test: /\.css|sass|scss$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: ['postcss-preset-env'],
							},
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new Webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, '../dist'),
		port: 8080,
		noInfo: true,
		allowedHosts: [], // 允许访问开发服务器服务的白名单
		// contentBase: false, // （提供静态文件）
		compress: false, // gzip压缩
		bonjour: false,
		disableHostCheck: true, // 是否屏蔽主机检查
		lazy: false, // 惰性模式
		filename: 'main.js',
		quiet: true,
		clientLogLevel: 'info', // info, silent, trace, debug, warn, error, none, warining
		headers: {},
		// https: {},
		https: false,
		open: false, // 开发服务器自动打开浏览器
		// openPage: '', // 指定打开浏览器时要浏览的页面
		hot: true, // 启动模块热替换
		overlay: true, // 显示编译器错误
		proxy: {
			// 接口请求代理
			'/api': {
				target: 'http://196.12.1.1',
				changeOrigin: true,
				pathRewrite: { '^/api': '' },
				secure: false,
			},
		},
		watchOptions: {
			ignored: '/node-modules/',
			aggregateTimeout: 1000, // 第一个文件更改后重新构建前增加延时
			poll: 1000, // 每秒检查一次变动
		},
		stats: 'errors-only',
		historyApiFallback: true, // 在使用单页面应用的时候，需要设置此参数，代表如果访问除根路径以外的地址
	},
};

const baseConfig = require('./base.config')()
module.exports = () => merge(baseConfig, config)
