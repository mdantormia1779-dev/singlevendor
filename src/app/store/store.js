import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice'; // ইমপোর্ট

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // রেজিস্টার করা
  },
});