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

3. chat Ai聊天
    - 创建 useChatStore 来管理聊天状态 ， 通过 chat.js 中封装的方法来实现获取AI的回复
    - 搜索框使用之前的组件 
    - 聊天区域
        使用Flexbox 实现了消息的对齐方式和排列方向，并使用不同的样式区分了AI和用户消息的视觉呈现
        使用 ReactMarkdown 来渲染AI的回复，使回复呈现更好的效果
        使用 react-vant 中的 Loading 组件来显示加载中的效果，加载完毕后替换为实际的回复内容
            ```jsx
            {message.isAI && message.content === "" ? (
                <Loading size="24px">加载中...</Loading>
            ) : (
                <ReactMarkdown>{message.content}</ReactMarkdown>
            )}
            ```
    - 输入区域
        - 输入框
            使用受控组件的方式来管理输入框的状态
        - 发送按钮
            点击发送按钮后，调用useChatStore 中的sendMessage方法来发送消息，并设置loading状态
            清空输入框的内容并在没有加载完成时禁用发送按钮

4. 个人中心页面
    
5. 收藏页面
    - 创建CollectionRecipeCard 组件
        使用 flex 布局 完成图片和文字的布局
        使用memo 来优化组件的性能
        使用useIntersectObs hook 来实现图片懒加载

6. 店铺页面
    - 创建ShopRecipeCard 组件
        使用 grid 布局 实现新品商品展示
        使用 宽高 1:1 的自适应比例 实现统一的商品图片展示大小
        使用useIntersectObs hook 来实现图片懒加载
