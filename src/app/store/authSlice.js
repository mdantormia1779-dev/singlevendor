import { createSlice } from "@reduxjs/toolkit";

const getInitialAuthState = () => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("finora_user");
      if (stored) {
        return {
          isAuthenticated: true,
          user: JSON.parse(stored),
        };
      }
    } catch (e) {}
  }
  return {
    isAuthenticated: false,
    user: null,
  };
};

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadStoredAuth: (state) => {
      if (typeof window !== "undefined") {
        try {
          const stored = localStorage.getItem("finora_user");
          if (stored) {
            state.user = JSON.parse(stored);
            state.isAuthenticated = true;
          } else {
            state.user = null;
            state.isAuthenticated = false;
          }
        } catch (e) {}
      }
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("finora_user", JSON.stringify(action.payload));
        } catch (e) {}
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("finora_user");
        } catch (e) {}
      }
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("finora_user", JSON.stringify(state.user));
          } catch (e) {}
        }
      }
    },
  },
});

export const { loadStoredAuth, loginSuccess, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
