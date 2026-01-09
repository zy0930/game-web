"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import type { User, LoginCredentials, RegisterCredentials, AuthState } from "@/types/auth";
import { authApi } from "@/lib/api";

const AUTH_STORAGE_KEY = "aone-auth";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (credentials: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.user) {
          setUser(parsed.user);
        }
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsHydrated(true);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);

    try {
      // Use the real /token API endpoint
      const response = await authApi.login(credentials.email, credentials.password);

      // Create user object from login response
      // Note: The /token endpoint only returns the token, not user info
      // User info would need to come from a separate profile endpoint
      const user: User = {
        id: credentials.email, // Use email as ID until profile API is available
        email: credentials.email,
        name: credentials.email,
        createdAt: new Date(),
      };

      setUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        token: response.access_token,
        expiresIn: response.expires_in,
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    setIsLoading(true);

    try {
      // Use the real /api/mapiuser/Register API endpoint
      // Note: If no referral code, pass empty string - system will auto-assign default
      await authApi.register({
        Username: credentials.username,
        Password: credentials.password,
        Email: credentials.email || "",
        Phone: credentials.phone,
        FullName: credentials.fullName || credentials.username,
        Upline: credentials.referralCode || "",
      });

      // After successful registration, log the user in
      const loginResponse = await authApi.login(credentials.username, credentials.password);

      const user: User = {
        id: credentials.username,
        email: credentials.email || "",
        name: credentials.username,
        createdAt: new Date(),
      };

      setUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
        user,
        token: loginResponse.access_token,
        expiresIn: loginResponse.expires_in,
      }));
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);

    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore logout API errors
    } finally {
      setUser(null);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoading(false);
    }
  }, []);

  // Prevent hydration mismatch
  if (!isHydrated) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
