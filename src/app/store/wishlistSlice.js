// store/wishlistSlice.js
import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      
      if (index >= 0) {
        // যদি অলরেডি থাকে, তাহলে রিমুভ হবে
        state.items.splice(index, 1);
      } else {
        // না থাকলে অ্যাড হবে
        state.items.push(product);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;