import { createSlice } from "@reduxjs/toolkit";

const initialDemoOrders = [
  {
    id: "#ORD-998241",
    customer: { name: "Tanvir Ahmed", phone: "01711223344", address: "House 24, Road 7, Banani, Dhaka" },
    date: "May 28, 2026",
    total: 3450,
    subtotal: 3330,
    deliveryFee: 120,
    items: 2,
    status: "Delivered",
    paymentMethod: "BKASH",
    paymentDetails: { wallet: "01711223344", trxId: "8HJ290X" },
    deliveryMethod: "Express (1-2 days)",
    products: [
      { id: 1, name: "Neptune Long-sleeve Shirt", price: 1450, qty: 1, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=100&q=80" },
      { id: 2, name: "Corduroy Slim-fit Pant", price: 2000, qty: 1, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=100&q=80" },
    ],
  },
  {
    id: "#ORD-887123",
    customer: { name: "Sadia Rahman", phone: "01819876543", address: "GEC Circle, Nasirabad, Chittagong" },
    date: "May 27, 2026",
    total: 1890,
    subtotal: 1830,
    deliveryFee: 60,
    items: 1,
    status: "Processing",
    paymentMethod: "NAGAD",
    paymentDetails: { wallet: "01819876543", trxId: "99PX81A" },
    deliveryMethod: "Standard (2-4 days)",
    products: [
      { id: 3, name: "Turtleneck Knitted Top", price: 1830, qty: 1, image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=100&q=80" },
    ],
  },
  {
    id: "#ORD-776109",
    customer: { name: "Arif Khan", phone: "01912345678", address: "Sector 4, Uttara, Dhaka" },
    date: "May 26, 2026",
    total: 5200,
    subtotal: 5080,
    deliveryFee: 120,
    items: 2,
    status: "Pending",
    paymentMethod: "COD",
    paymentDetails: null,
    deliveryMethod: "Express (1-2 days)",
    products: [
      { id: 4, name: "Wool Oversized Sweater", price: 2540, qty: 2, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=100&q=80" },
    ],
  },
];

const initialState = {
  items: [],
  buyNowItem: null,
  orders: initialDemoOrders,
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
            state.orders = JSON.parse(stored);
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
      const { orderId, status } = action.payload;
      const cleanTarget = orderId.replace(/^#/, "").toLowerCase();
      const existing = state.orders.find(
        (o) => o.id.replace(/^#/, "").toLowerCase() === cleanTarget
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
} = cartSlice.actions;

export default cartSlice.reducer;