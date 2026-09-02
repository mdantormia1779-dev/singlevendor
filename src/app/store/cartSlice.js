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
    // Load persisted orders scoped to active authenticated user
    loadStoredOrders: (state, action) => {
      const activeUserId = action.payload || null;
      if (typeof window !== "undefined") {
        try {
          if (!activeUserId) {
            state.orders = [];
            return;
          }
          const stored = localStorage.getItem(`finora_orders_${activeUserId}`);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              state.orders = parsed.filter((o) => o?.userId === activeUserId);
            }
          } else {
            state.orders = [];
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
      const order = action.payload;
      state.orders.unshift(order);
      if (typeof window !== "undefined" && order?.userId) {
        try {
          localStorage.setItem(
            `finora_orders_${order.userId}`,
            JSON.stringify(state.orders.filter((o) => o?.userId === order.userId))
          );
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
        if (typeof window !== "undefined" && existing?.userId) {
          try {
            localStorage.setItem(
              `finora_orders_${existing.userId}`,
              JSON.stringify(state.orders.filter((o) => o?.userId === existing.userId))
            );
          } catch (e) {}
        }
      }
    },

    // Delete Order
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      const cleanTarget = (orderId || "").replace(/^#/, "").toLowerCase();
      const deletedOrder = state.orders.find(
        (o) => (o.id || "").replace(/^#/, "").toLowerCase() === cleanTarget
      );
      state.orders = state.orders.filter(
        (o) => (o.id || "").replace(/^#/, "").toLowerCase() !== cleanTarget
      );
      if (typeof window !== "undefined" && deletedOrder?.userId) {
        try {
          localStorage.setItem(
            `finora_orders_${deletedOrder.userId}`,
            JSON.stringify(state.orders.filter((o) => o?.userId === deletedOrder.userId))
          );
        } catch (e) {}
      }
    },

    // Clear All Orders (e.g. on logout)
    clearOrders: (state, action) => {
      const activeUserId = action.payload || null;
      state.orders = [];
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("finora_orders");
          if (activeUserId) {
            localStorage.removeItem(`finora_orders_${activeUserId}`);
          }
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