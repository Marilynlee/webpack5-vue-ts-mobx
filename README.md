# vue2 project template

- 前端框架：vue2
- 状态管理库：mobx
- 路由：vue-router
- UI库：element UI
- 打包工具：webpack5
- 语言：typeScript
- 样式：scss
- husky+commit-lint规范提交


注：搭建个环境一堆坑啊！此坑到彼坑，各种npm包不兼容，无力吐槽！

# bug 
1. webpack5的HMR热更新不起作用
原因：与 browserslist 冲突导致热更新失效
解决方案：可通过版本降级，或者是 webpack的配置中增加target: process.env.NODE_ENV === "development" ? "web" : "browserslist", 在开发阶段使得 browserslist 失效

2. webpack配置的resolve alias，Typescript不识别提示“[tslint] Module '@components/xxx' is not listed as dependency in package.json (no-implicit-dependencies)”
原因：Typescript项目需要识别别名的环节，主要包括：vscode语法检查、tsc编译、单元测试、lint、webpack打包。如果是node项目，还要考虑node运行时的别名识别。其中，vscode语法检查、tsc编译，以及单元测试，这三个环节依赖的是tsconfig.json中的别名配置；webpack打包依赖的是webpack.config.js中的别名配置；node的别名识别需要载入一个叫做module-alias的包。

tsconfig中负责别名配置的是两个字段：
```
  "baseUrl": "./",
  "paths": {
    "~/*": ["./src/*"]
  } 
```
baseUrl用来描述计算相对路径时的根目录，paths用来描述路径别名。**注意：如果配置了paths，就一定要配置baseUrl，否则后面会遇到问题。**
[详见此文章](https://zhuanlan.zhihu.com/p/298189197)



