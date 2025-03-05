/*
 * @Author: xiaoman
 * @Date: 2024-05-06 15:12:45
 * @LastEditors: xiaoman
 * @Description: 用户信息
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PowerState {
  expiredate: string,
  level: number,
  name: string
}

export enum LOGINMODE {
  /**
   * 浏览器
   */
  BROWSER,
  /**
   * unity软件
   */
  UNITY
}

interface UserInfoState {
  id: string;
  token: string;
  powers: PowerState[];
  mobile: string;
  realname: string;
  pointid: string;
}

interface UserInfoSlice {
  /**
   * 用户信息
   */
  userInfo: UserInfoState,
  /**
   * 系统标题
   */
  title: string,
  /**
   * 系统logo地址
   */
  logo: string,
  /**
   * 登陆途径
   */
  loginMode: LOGINMODE
}

const initialState: UserInfoSlice = {
  userInfo: {
    id: "",
    token: "",
    powers: [],
    mobile: "",
    realname: "",
    pointid: "",
  },
  title: "",
  logo: "",
  loginMode: LOGINMODE.BROWSER
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfoState>) => {
      state.userInfo = action.payload
    },
  },
  // extraReducers(builder) {
    // builder.addCase(getSystemConfigAction.rejected, (state) => {
    //   state.title = "";
    //   state.logo = "";
    // })
  // },
});

export const { setUserInfo } = userSlice.actions;

export default userSlice.reducer;