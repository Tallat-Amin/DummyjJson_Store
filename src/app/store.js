import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/authSlice";
import productsReducer from "../features/Products/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
  },
});
