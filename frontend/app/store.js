import { configureStore } from "@reduxjs/toolkit";
import { api } from "../redux/api/apiSlice";
import userReducer from "../redux/features/user/userSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    userState: userReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
