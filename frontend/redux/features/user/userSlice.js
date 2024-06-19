'use client';
import { api } from "@/redux/api/apiSlice";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

// Function to get user from localStorage
const getUserFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  error: null,
}

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = {
        ...action.payload.user,
        token: action.payload.token,
      };
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      Cookies.remove('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.loginUser.matchFulfilled, (state, action) => {
        console.log(action.payload);
        const user = {
          ...action.payload.user,
          token: action.payload.token,
        };
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addMatcher(api.endpoints.loginUser.matchRejected, (state) => {
        state.user = null;
        state.error = "Invalid email or password";
        localStorage.removeItem("user");
      })
      .addMatcher(api.endpoints.logoutUser.matchFulfilled, (state) => {
        state.user = null;
        localStorage.removeItem("user");
      });
  },
});


export const localStorageMiddleware = ({ getState }) => {
  return (next) => (action) => {
    if (typeof window!== 'undefined' &&!getState().user) {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        next(setUser({ payload: { user, token: user.token } }));
      }
    }
    return next(action);
  };
};

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;