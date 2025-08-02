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
    pnpm i react-router-dom zustand axios react react-dom react-vant @react-vant/icons
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
    - 配置 index.css 
        - 避免文字换行异常
        - 防止意外的光标显示
        - 仅在实际输入框中显示光标
            ```css
            /* 防止意外的光标显示 */
            * {
            caret-color: transparent !important;
            }
            /* 仅在实际输入框中显示光标 */
            input, textarea {
            caret-color: auto !important;
            }
            ```

5. 在index.html中修改项目标题
     <title>掌上厨房</title>

## 功能模块
1. 路由搭建
    - MainLayout
        Outlet
            Home 首页  /home
            Shop 店铺  /shop
            Camera 拍照查询菜品  /camera
            Collection 收藏  /collection
            Account 账号  /account
        Tabbar 导航栏
    - BlankLayout
        Login 登录
            /login
        Register 注册
            /register
        RecipeDetail 菜谱详情
            /recipe/detail
        ProductDetail 商品详情
            /product/detail
        Search 搜索
            /search


2. 首页
    - 搜索框
        点击搜索框进入搜索界面
    - 首页内部路由
        - Follow 关注
        - Recommend 推荐
            推荐菜谱
        - Weightloss 减脂
        - Category 分类
    - 使用 IntersectionObserver 封装自定义hooks 实现加载更多菜谱并实现图片懒加载

