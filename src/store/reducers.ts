/*
 * @Author: xiaoman
 * @Date: 2024-04-17 19:50:01
 * @LastEditors: xiaoman
 * @Description: 
 */
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const rootReducer = combineReducers({
  user: userSlice,
})

export default rootReducer