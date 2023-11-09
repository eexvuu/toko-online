import { configureStore } from "@reduxjs/toolkit";
import cartItems from "./slicers/cart";
import products from "./slicers/products";

export const store = configureStore({
  reducer: {
    products,
    cartItems,
  },
});