// redux/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    // cartSlice.js
    addToCart: (state, action) => {
      const exists = state.items.find((item) => item.id === action.payload.id);

      if (exists) {
        exists.quantity += 1;
      } else {
        // এখানে ...action.payload এর সাথে quantity: 1 যোগ করে দিচ্ছি
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    // ✅ quantity increase
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ quantity decrease
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ✅ remove item
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
