import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  buyNowItem: null,
  orders: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Load persisted orders on client
    loadStoredOrders: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("finora_orders");
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              // Strip out any stale demo orders
              const filtered = parsed.filter(
                (o) => !["#ORD-998241", "#ORD-887123", "#ORD-776109"].includes(o?.id)
              );
              if (
                state.orders.length !== filtered.length ||
                state.orders.some((o, i) => o?.id !== filtered[i]?.id)
              ) {
                state.orders = filtered;
              }
            }
          }
        } catch (e) {}
      }
    },

    // Add to Cart
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

    // Increase
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
    },

    // Decrease
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },

    // Remove
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear Cart
    clearCart: (state) => {
      state.items = [];
    },

    // Buy Now
    setBuyNowItem: (state, action) => {
      state.buyNowItem = action.payload;
    },

    clearBuyNowItem: (state) => {
      state.buyNowItem = null;
    },

    // Save Order
    addOrder: (state, action) => {
      state.orders.unshift(action.payload); // latest first
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("finora_orders", JSON.stringify(state.orders));
        } catch (e) {}
      }
    },

    // Update Order Status (Admin action)
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload || {};
      if (!orderId) return;
      const cleanTarget = String(orderId).replace(/^#/, "").toLowerCase();
      const existing = (state.orders || []).find(
        (o) => String(o?.id || "").replace(/^#/, "").toLowerCase() === cleanTarget
      );
      if (existing) {
        existing.status = status;
      }
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("finora_orders", JSON.stringify(state.orders));
        } catch (e) {}
      }
    },

    // Delete Order
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      const cleanTarget = (orderId || "").replace(/^#/, "").toLowerCase();
      state.orders = state.orders.filter(
        (o) => (o.id || "").replace(/^#/, "").toLowerCase() !== cleanTarget
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("finora_orders", JSON.stringify(state.orders));
        } catch (e) {}
      }
    },

    // Clear All Orders (e.g. on logout)
    clearOrders: (state) => {
      state.orders = [];
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("finora_orders");
        } catch (e) {}
      }
    },
  },
});

export const {
  loadStoredOrders,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  setBuyNowItem,
  clearBuyNowItem,
  addOrder,
  updateOrderStatus,
  deleteOrder,
  clearOrders,
} = cartSlice.actions;

export default cartSlice.reducer;