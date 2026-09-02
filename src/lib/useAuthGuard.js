"use client";

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useAuthGuard = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const checkIsAuthenticated = useCallback(() => {
    if (isAuthenticated || Boolean(user)) return true;
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("finora_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && (parsed.id || parsed.email)) {
            return true;
          }
        }
      } catch (e) {}
    }
    return false;
  }, [isAuthenticated, user]);

  const requireAuth = useCallback(
    (actionMessage = "Please login to continue", customRedirect = "") => {
      const isAuthed = checkIsAuthenticated();

      if (!isAuthed) {
        toast.warning(`${actionMessage} 🔒`, {
          toastId: "auth-guard-warning",
        });

        const currentPath =
          customRedirect ||
          (typeof window !== "undefined"
            ? window.location.pathname + window.location.search
            : "");

        const redirectParam = currentPath
          ? `?redirect=${encodeURIComponent(currentPath)}`
          : "";

        router.push(`/login${redirectParam}`);
        return false;
      }

      return true;
    },
    [checkIsAuthenticated, router]
  );

  return {
    isAuthenticated: checkIsAuthenticated(),
    user,
    requireAuth,
  };
};

export default useAuthGuard;
