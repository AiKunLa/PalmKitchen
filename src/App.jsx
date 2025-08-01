import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import MainLayout from "@/components/MainLayout";
import BlankLayout from "@/components/BlankLayout";
import GlobalLoading from "@/components/GlobalLoading";

// 带有tabbar的Layout
const Home = lazy(() => import("@/pages/home"));
const Shop = lazy(() => import("@/pages/shop"));
const Camera = lazy(() => import("@/pages/camera"));
const Collection = lazy(() => import("@/pages/collection"));
const Account = lazy(() => import("@/pages/account"));

// 不需要tabbar的Layout
const Login = lazy(() => import("@/pages/login"));
const Register = lazy(() => import("@/pages/register"));
const RecipeDetail = lazy(() => import("@/pages/recipeDetail"));
const ProductDetail = lazy(() => import("@/pages/productDetail"));
const Search = lazy(() => import("@/pages/search"));

function App() {
  return (
    <>
      <Suspense fallback={<GlobalLoading />}>
        <Routes>
          {/* 重定向到home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/camera" element={<Camera />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route element={<BlankLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recipe/detail/:id" element={<RecipeDetail />} />
            <Route path="/product/detail/:id" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
