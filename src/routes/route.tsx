/*
 * @Author: xiaoman
 * @Date: 2024-04-20 11:58:53
 * @LastEditors: xiaoman
 * @Description: 路由表
 */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

//错误页面
import ErrorPage from "@/views/ErrorPage/ErrorPage";
//路由懒加载
const Home = lazy(() => import("@/views/Home/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
