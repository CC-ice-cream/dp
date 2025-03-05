/*
 * @Author: xiaoman
 * @Date: 2024-04-17 19:36:08
 * @LastEditors: xiaoman
 * @Description: 
 */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
// import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import logger from 'redux-logger';
// import counterSlice from "../views/Home/modules/counterSlice";
const persistConfig = {
  key: "xkzshls",
  storage:storageSession,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>{
    if(import.meta.env.DEV){
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(logger);
    }

    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
  }
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
