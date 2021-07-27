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

#bug 
1. webpack5的HMR热更新不起作用
原因：与 browserslist 冲突导致热更新失效
解决方案：可通过版本降级，或者是 webpack的配置中增加target: process.env.NODE_ENV === "development" ? "web" : "browserslist", 在开发阶段使得 browserslist 失效





