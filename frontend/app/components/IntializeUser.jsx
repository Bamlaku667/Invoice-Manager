'use client';
import { setUser } from "@/redux/features/user/userSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function IntializeUser({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage) {
      const parsedUser = JSON.parse(userFromLocalStorage);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  return <div>{children}</div>;
}

export default IntializeUser;
