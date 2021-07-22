// import devConfig from './build/dev.config';
// import prodConfig from './build/prod.config';
//
// module.exports = (environment, args) => {
// 	console.log('webpack config env', environment, args);
// 	console.log('process', process.env.NODE_ENV);
// 	switch (environment.env) {
// 		case 'dev':
// 			return devConfig;
// 		case 'prod':
// 			return prodConfig;
// 		default:
// 			throw new Error('No matching webpack configuration was found!');
// 	}
// };

module.exports = (env: any) => {
  return require(`./build/${env.env || 'dev'}.config.ts`)()
}
