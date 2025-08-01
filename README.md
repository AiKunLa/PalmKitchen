#  PalmKitchen 掌上厨房
一个分享做菜的App

## 技术栈
- react全家桶
    react react-dom react-router-dom zustand
- UI组件库 react-vant
- axios 网络请求，请求拦截器，响应拦截器
- jwt 登录校验
- mock 模拟后端接口
- git 

## 项目目录


## 配置
1. 依赖配置
    pnpm i react-router-dom zustand axios react react-dom react-vant
    pnpm i vite-plugin-mock -D 开发阶段
    pnpm i lib-flexible  解决移动端适配 等分屏幕
    pnpm i -D postcss postcss-pxtorem  解决px 转换为rem
    

2. 配置vite.config.js
    ```js
        import { defineConfig } from "vite";
        import react from "@vitejs/plugin-react-swc";
        import { viteMockServe } from "vite-plugin-mock";
        import path from "path";
        // https://vite.dev/config/
        export default defineConfig({
            plugins: [
                react(),
                viteMockServe({
                    mockPath: "mock",
                    localEnabled: true,
                }),
            ],
            resolve: {
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                },
            },
        });
    ```
3. 创建.env.local 配置环境变量

4. 移动端适配
    - 在index.html meta标签中添加   user-scalable=no  进制缩放
    - 配置postcss 插件来 结合lib-flexible 计算rem
        配置postcss.config.js
        ```js
                export default {
                    plugins: {
                        'postcss-pxtorem': {
                            rootValue: 75, // 以 iPhone6 为参考，1rem = 75px    200 / 75 = 2.6666666666666665rem
                            propList: ['*'], // 所有属性都转换
                            exclude: /node_modules/i, // 排除 node_modules 中的文件
                        },
                    },
                }
        ```
        在main.jsx 中引入lib-flexible
        ```js
        import 'lib-flexible'
        ```
    
5. 在index.html中修改项目标题
     <title>掌上厨房</title>