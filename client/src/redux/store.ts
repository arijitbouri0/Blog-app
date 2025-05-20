import { configureStore } from "@reduxjs/toolkit";
import blogApi from "./api/api";
import authSlice from "./reducers/auth";
import blogSlice from "./reducers/blog";

const store = configureStore({
  reducer: {
    auth:authSlice.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    blog:blogSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
