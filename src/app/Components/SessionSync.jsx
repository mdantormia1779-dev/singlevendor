"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loadStoredAuth } from "@/app/store/authSlice";
import { authClient } from "@/lib/auth-client";

export default function SessionSync({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. First load any existing user from localStorage
    dispatch(loadStoredAuth());

    // 2. Check live Better Auth session (e.g. after Google OAuth redirect)
    if (authClient?.getSession) {
      authClient
        .getSession()
        .then((res) => {
          if (res?.data?.user) {
            const user = res.data.user;
            dispatch(
              loginSuccess({
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "customer",
                avatar: user.image || user.avatar,
                image: user.image,
              })
            );
          }
        })
        .catch(() => {});
    }
  }, [dispatch]);

  return <>{children}</>;
}
