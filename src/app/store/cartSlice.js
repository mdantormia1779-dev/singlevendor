import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    // প্রয়োজনে আরও রিডিউসার এখানে যোগ করতে পারেন
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;