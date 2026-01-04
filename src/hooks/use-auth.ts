"use client";

import { useState, useCallback } from "react";
import type { AuthState, LoginCredentials, RegisterCredentials } from "@/types/auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const { user } = await response.json();
      setAuthState({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: (error as Error).message };
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      // TODO: Replace with actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const { user } = await response.json();
      setAuthState({ user, isAuthenticated: true, isLoading: false });
      return { success: true };
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return { success: false, error: (error as Error).message };
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    } catch {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
  };
}
