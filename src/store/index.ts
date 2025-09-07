import { configureStore } from "@reduxjs/toolkit";
import { articlesReducer } from "./articlesSlice";
import { authReducer } from "./authSlice";

export const store = configureStore({
  reducer: { articles: articlesReducer, auth: authReducer },
});
