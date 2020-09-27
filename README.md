# Electron模板

## 配置环境
1. 执行yarn命令安装依赖
> cd electron-template <br>
> yarn
2. 在开发环境执行开发, 执行yarn dev
> yarn dev
3. 在正式环境运行
> yarn build <br>
> yarn start
4. 打包
> yarn package

## 资料
1. 该模板基于[Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)模板
2. [webpack打包工具](https://blog.csdn.net/hope_It/article/details/103266023)
3. [typescript手册](https://www.typescriptlang.org/docs/handbook/interfaces.html)
4. [es6入门](https://es6.ruanyifeng.com/?search=promise&x=0&y=0)
5. [es5入门](https://wangdoc.com/javascript/)
6. [Redux技术栈](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html)

## 小技巧
1. flex子元素中自动按内容生成滚动条需要在css中配置
>   overflow: auto; <br>
    height: 0;
2. 为了让flex在垂直方向也能实现伸缩，需要在css中添加html, body{ height: 100%}