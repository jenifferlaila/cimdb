import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { useDispatch, useSelector, useStore } from "react-redux";
import { metaReducer } from "./meta";

const store = configureStore({
  reducer: {
    user: userReducer,
    meta: metaReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
