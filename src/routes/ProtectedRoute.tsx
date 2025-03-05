/*
 * @Author: xiaoman
 * @Date: 2024-04-20 18:02:05
 * @LastEditors: xiaoman
 * @Description: 路由权限守卫
 */

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth";
import { FC } from "react";
import { useAppSelector } from "@/store/hook";

interface ProtectedRouteState {
  element?: JSX.Element;
}

const ProtectedRoute: FC<ProtectedRouteState> = () => {
  const uid = useAppSelector(state => state.user.userInfo.id)
  const location = useLocation();
  const isLoginPath = /\/login/.test(location.pathname);
  const { user } = useAuth();
  const searchParams = new URLSearchParams(location.search)
  const uidQuery = searchParams.get('uid');
  if (!uidQuery) {
    if (uid && !localStorage.getItem("xkzshls-uid")) localStorage.setItem("xkzshls-uid", uid);
    if (!user.token && !isLoginPath) {
      localStorage.removeItem("xkzshls-token");
      localStorage.removeItem("xkzshls-uid");
      return <Navigate to="/login" state={{ from: location }} replace />;
    } else if (location.pathname === "/") {
      return <Navigate to="/modeSelect" state={{ from: location }} replace />;
    }
  }
  return (
    <Outlet />
  ); // 使用 Outlet 组件来渲染匹配的子路由
};

export default ProtectedRoute;
