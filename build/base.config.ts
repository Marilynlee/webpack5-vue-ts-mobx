import * as path from 'path';
import * as fs from 'fs';
import * as Webpack from 'webpack';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin-webpack5');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

/**
 * pages目录下，直接存在main.js则为单入口
 * pages目录下，全为文件夹且每个文件夹下配置main.js文件、index.html模板，则为多入口
 */
const srcRoot = path.resolve(__dirname, '../src');
const pageDir = path.resolve(srcRoot, 'pages');

function getEntry() {
	const entryMap = {};
	let isMulti = true;
	// 遍历page文件夹下的目录是不是全是文件夹，全是文件夹就是多入口,存在main.js就是单入口
	fs.readdirSync(pageDir).forEach((pathname) => {
		// 获取page下文件夹的绝对路径
		const fullPathName = path.resolve(pageDir, pathname);
		// 同步读取文件信息
		const stat = fs.statSync(fullPathName);
		// 获取文件夹下的main.js文件路径
		const fileName = path.resolve(fullPathName, 'main.ts');

		if (!stat.isDirectory() && pathname === 'main.ts') {
			isMulti = false;
		}
		// 判断是不是文件夹，且存在main.js文件
		if (stat.isDirectory() && fs.existsSync(fileName)) {
			entryMap[pathname] = fileName;
		}
	});
	console.log(`*****************webpack entry result: isMulti ${isMulti}`);
	return isMulti ? entryMap : './src/pages/main.ts';
}

/**
 * 获取index.html模板
 */
function getHtmlArr(entry) {
	const htmlArr = [];
	if (typeof entry === 'string') {
		htmlArr.push(
			new HtmlWebpackPlugin({
				template: './src/pages/index.html',
				filename: 'index.html',
				title: 'home',
				inject: true,
				hash: true, //开启hash  ?[hash]
				chunks: ['vendor', 'manifest', 'main'], //页面要引入的包
				minify:
					process.env.NODE_ENV === 'development'
						? false
						: {
								removeComments: true, //移除HTML中的注释
								collapseWhitespace: true, //折叠空白区域 也就是压缩代码
								removeAttributeQuotes: true, //去除属性引用
						  },
			}),
		);
	}

	if (typeof entry === 'object') {
		Object.keys(entry).forEach((key) => {
			const fullPathName = path.resolve(pageDir, key);
			const filename = path.resolve(fullPathName, 'index.html');
			if (fs.existsSync(filename)) {
				htmlArr.push(
					new HtmlWebpackPlugin({
						template: filename,
						filename: key + '.html',
						title: key,
						inject: true,
						hash: true, //开启hash  ?[hash]
						chunks: ['vendor', 'manifest', key], //页面要引入的包
						minify:
							process.env.NODE_ENV === 'development'
								? false
								: {
										removeComments: true, //移除HTML中的注释
										collapseWhitespace: true, //折叠空白区域 也就是压缩代码
										removeAttributeQuotes: true, //去除属性引用
								  },
					}),
				);
			}
		});
	}
	console.log(htmlArr);
	return htmlArr;
}

const entry = getEntry();
const htmlArr = getHtmlArr(entry);

const config = {
	context: path.resolve(__dirname, '../'),
	entry,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[fullhash:8].bundle.js',
		chunkFilename: '[name].[fullhash:8].bundle.js',
		publicPath: '/',
	},
	plugins: [
		...htmlArr,
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: path.resolve(__dirname, '../src/assets'), to: 'assets' },
			],
		}),
		new FriendlyErrorsWebpackPlugin(),
		new Webpack.ProvidePlugin({
			Vue: ['vue/dist/vue.esm.js', 'default'],
		}),
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					{
						loader: 'vue-loader',
					},
				],
			},
			{
				// webpack5 内置了 asset 模块, 用来代替 file-loader & url-loader & raw-loader 处理静态资源
				test: /\.png|jpg|gif|jpeg|svg/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'img/[name].[base].[fullhash:7].[ext]',
				},
			},
			{
				// webpack5 内置了 asset 模块, 用来代替 file-loader & url-loader & raw-loader 处理静态资源
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'media/[name].[base].[fullhash:7].[ext]',
				},
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 10 * 1024,
					},
				},
				generator: {
					filename: 'fonts/[name].[base].[fullhash:7].[ext]',
				},
			},
			{
				test: /\.txt|xlsx/,
				type: 'asset',
				generator: {
					filename: 'files/[base]',
				},
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue'],
		plugins: [
			// 将 tsconfig 中配置的路径别名映射到 webpack.resolve.alias 上
			new TsconfigPathsPlugin(),
		],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, '../src'),
		}
	},
};
module.exports = () => config
