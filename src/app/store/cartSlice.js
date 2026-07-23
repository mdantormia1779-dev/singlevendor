import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  buyNowItem: null,
  orders: [], // ✅ NEW (সব order এখানে থাকবে)
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ✅ Add to Cart
    addToCart: (state, action) => {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        exists.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },

    // ✅ Increase
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    // ✅ Decrease
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // ✅ Remove
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // ✅ Buy Now
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
    },

    // ✅ ⭐ সবচেয়ে important (Order Save)
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // latest first
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  setBuyNowItem,
  clearBuyNowItem,
  addOrder, // ✅ export করতে হবে
} = cartSlice.actions;

export default cartSlice.reducer;