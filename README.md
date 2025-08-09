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
    pnpm i jsonwebtoken  解决登录校验

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
    - 使用 useLazyLoadImg 自定义hooks 实现图片懒加载

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

7. 菜谱详情页面
    - 使用事件委托的方式，来实现详情页的跳转
        
    - 创建TopDetail 组件
        使用 flex 布局 完成标题和评分的布局
        使用useIntersectObs hook 来实现图片懒加载
    - 创建RecipeDetail 组件
    - 将自定义hook useIntersectObs 与 用于定位的一组html元素 封装成一个组件。 
        组件接收一个boolen 和 一个回调函数（用于发起请求） 作为参数
        组件内部使用自定义hook useIntersectObs 来监听元素的可见性
        当元素进入视口时，组件会触发回调函数
8. 搜索页面
    - 创建SearchPage 组件
        使用 display: inline-flex; 实现搜索历史和搜索建议的气泡布局
        使用useSearchStore 来管理搜索状态
            - 搜索建议
            - 搜索历史
            - 搜索结果
        使用事件委托的方式 来实现搜索建议和搜索历史的点击事件，统一处理
            在RecipeCard 上设置 data-recipe-id 属性，并回调函数中使用closest 方法 查找最近的带有data-recipe-id属性的祖先元素
        创建RecipeList组件
            - 该组件可以复用于搜索结果展示和收藏展示
                在该组件中整合了，详情页的转跳，并使用了之前创建的LoadMore组件用于加载更多内容
            - 接收搜索结果作为参数
            - 使用map 方法 遍历搜索结果 渲染RecipeCard 组件
        
9. 登录
    - 使用jwt来生成token凭证
    - 在mock 中使用jsonwebtoken 来生成并校验token，使用sign生成token，verify校验token
    - 使用axios拦截请求，在请求头中添加token
    - 使用路由守卫PrivateRoute，来保护需要登录才能访问的页面
        ```js
            <Route element={<PrivateRoute/>}>
              <Route path="/account" element={<Account />} />
              <Route path="/collection" element={<Collection />} />
            </Route>
        ```
        创建useAuthStore 使用zustand 来管理登录状态
            - 未登录时，将isAuthenticated 设置为false
            - 登录后，将isAuthenticated 设置为true
        在PrivateRoute 中使用isAuthenticated 来判断是否登录
            - 未登录时，跳转到登录页面
            - 进入登录页面登录后，导航到之前访问的页面，若之前未访问过页面，则导航到首页

        使用refreshToken 来实现token的无感刷新
            后端用户登录校验成功后，返回授权码code
            前端使用code 向后端请求accessToken 和 refreshToken
            accessToken用于请求资源 2小时过期
            refreshToken用于刷新accessToken 7天过期
            当accessToken 过期时，不需要用户再次登录，而是使用refreshToken 来刷新accessToken，从而实现无感刷新
        创建工具类tokenUtils 与 localStorageUtils 
            - tokenUtils 校验token、从localStorage 中获取token
            - localStorageUtils 存储数据

10. 添加侧边栏功能
    使用react-vant中的Popup 组件 实现侧边栏
    在侧边栏中，可以进行一些页面的导航，以及登录登出操作
    - 登录登出
        - 未登录时，显示登录按钮
        - 登录后，显示用户信息和登出按钮
    





## 问题优化
1. 如何解决在组件挂载时由于使用useEffect导致每次组件挂载时都请求新数据的问题
    - 在状态管理中添加缓存机制
    - 在useEffect中添加条件检查，只有当数据不存在时才在组件挂载时请求数据
        ```js
        useEffect(() => {
            if (!data) {
                fetchData();
            }
        }, [data]);
        ```
    - 创建一个通用的钩子来处理带缓存的数据加载逻辑：

2. 如何实现当登录成功后导航到之前被守卫的页面
    - 通过传递路径参数来实现 在路由守卫中获取被守卫组件的路径并传递给登录组件，登录成功后导航到之前被守卫的页面

    - 在守卫组件中添加如下逻辑
        ```js
            import { Navigate, useLocation } from "react-router-dom";
            const location = useLocation();
            if(没有登录){
                return <Navigate to={{
                    pathname: "/login",
                    search: `redirect=${encodeURIComponent(
                        location.pathname + location.search
                    )}`,
                }} replace />;
            }
        ```
    - 在登录组件中添加逻辑
        ```js
            import { useLocation, useNavigate } from "react-router-dom";
            const navigate = useNavigate();
            const location = useLocation();
            const redirect = new URLSearchParams(location.search).get("redirect");
            ...登录处理
            ...登录成功后处理
            if (redirect) {
                navigate(redirect);
            }
        ```


3. 如何实现统一错误处理


4. 如何实现元素可见跟踪
    用于图片懒加载、无限滚动加载更多内容
    - 创建useIntersectObs 接收回调函数，返回ref用于监听元素
        用于监听元素的可见性
        当元素进入视口时，触发回调函数
    - 创建LoadMore 组件
        用于加载更多内容
        当用户滚动到组件底部时，触发加载更多内容的请求