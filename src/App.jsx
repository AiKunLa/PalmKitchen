import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "@/components/MainLayout";
import BlankLayout from "@/components/BlankLayout";
import GlobalLoading from "@/components/GlobalLoading";
import PrivateRoute from "@/components/PrivateRoute";

// 带有tabbar的Layout
const Home = lazy(() => import("@/pages/home"));
// Home
const Recommend = lazy(() => import("@/pages/Home/Recommend"));
const Follow = lazy(() => import("@/pages/Home/Follow"));
const Weightloss = lazy(() => import("@/pages/Home/Weightloss"));
const Category = lazy(() => import("@/pages/Home/Category"));

const Shop = lazy(() => import("@/pages/Shop"));
const Camera = lazy(() => import("@/pages/camera"));
const Collection = lazy(() => import("@/pages/collection"));
const Account = lazy(() => import("@/pages/account"));

// 不需要tabbar的Layout
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const RecipeDetail = lazy(() => import("@/pages/recipeDetail"));
const ProductDetail = lazy(() => import("@/pages/productDetail"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));

function App() {
  return (
    <>
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          {/* 重定向到home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />}>
              {/* 正确的嵌套路由配置 - 使用index路由作为默认值 */}
              <Route index element={<Recommend />} />
              <Route path="follow" element={<Follow />} />
              <Route path="weightloss" element={<Weightloss />} />
              <Route path="category" element={<Category />} />
            </Route>

            <Route path="/shop" element={<Shop />} />
            <Route path="/camera" element={<Camera />} />

            <Route element={<PrivateRoute/>}>
              <Route path="/account" element={<Account />} />
              <Route path="/collection" element={<Collection />} />
            </Route>
          </Route>

          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/detail/:id" element={<RecipeDetail />} />
            <Route path="/product/detail/:id" element={<ProductDetail />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
