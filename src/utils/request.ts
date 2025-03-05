/*
 * @Author: xiaoman
 * @Date: 2024-04-22 16:05:55
 * @LastEditors: xiaoman
 * @Description: axios拦截器文件
 */

// import { useAppSelector } from '@/store/hook';
import { notification } from "antd";
import axios, { AxiosError, AxiosResponse } from "axios";

// 创建新的axios实例
const service = axios.create({
  // 公共接口
  baseURL: "http://59.202.54.17:58866/xlm-gateway-jxharz/sfm-api-gateway/gateway/agent/api/",
  // 超时时间 单位是ms，这里设置了5s的超时时间
  timeout: 5000,
});

// 添加一个请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json"; // 设置请求头
    config.headers["Request-Start-Time"] = Date.now(); // 自定义请求发送时间
    // const token = useAppSelector(state => state.user.userInfo.token);
    const token = "";
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { status, data, config } = response;
    try {
      const startTime = config.headers["Request-Start-Time"];
      const endTime = Date.now();
      const delay = endTime - startTime;
      if (delay >= 1500) {
        notification.open({
          message: "提示",
          description: "当前网络波动较大",
        });
      }
    } catch (error) {
      console.error(error);
    }

    if (status === 200) {
      // 接口网络请求成功，关闭等待提示
      if (data.status === "200") {
        // 接口请求结果正确
        return data;
      } else{
        return Promise.reject(data);
      }
    }
  },
  (error: AxiosError) => {
    const { response } = error;
    // 响应失败，关闭等待提示
    // Toast.clear();

    if (response) {
      if (response.status === 400) {
        console.error("请求错误, 请稍后再试(400)", 2);
      } else if (response.status === 401) {
        console.error("请求错误,请稍后再试(401)", 2);
      } else {
        console.error("请求错误,请稍后再试(403)", 2);
      }
    }
    // 提示错误信息
    if (JSON.stringify(error).includes("Network Error")) {
      notification.open({
        message: "提示",
        description: "网络请求超时，请检查网络是否正常...",
      });
    } else {
      notification.open({
        message: "提示",
        description: error.message,
      });
    }

    return Promise.reject(error);
  }
);

export default service;
