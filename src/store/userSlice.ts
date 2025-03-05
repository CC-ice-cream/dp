/*
 * @Author: xiaoman
 * @Date: 2024-05-06 15:12:45
 * @LastEditors: xiaoman
 * @Description: 会话信息
 */

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserInfoSlice {
  /**
   * APP_KEY
   */
  auth: string;
  /**
   * 智能体编码
   */
  agentCode: string;
  /**
   * 智能体版本
   */
  agentVersion: string;
  /**
   * sessionid
   */
  sessionId: string;
}

const initialState: UserInfoSlice = {
  auth: "",
  agentCode: "",
  agentVersion: "",
  sessionId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<UserInfoSlice["auth"]>) => {
      state.auth = action.payload;
    },
    setAgentCode: (
      state,
      action: PayloadAction<UserInfoSlice["agentCode"]>
    ) => {
      state.agentCode = action.payload;
    },
    setAgentVersion: (
      state,
      action: PayloadAction<UserInfoSlice["agentVersion"]>
    ) => {
      state.agentVersion = action.payload;
    },
    setSessionId: (
      state,
      action: PayloadAction<UserInfoSlice["sessionId"]>
    ) => {
      state.sessionId = action.payload;
    },
  },
});

export const { setAuth, setAgentCode, setAgentVersion, setSessionId } =
  userSlice.actions;

export default userSlice.reducer;
