import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginSuccess: (credentialResponse: any) => void;
  loginError: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("genpath_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // Persistence
  useEffect(() => {
    if (user) {
      localStorage.setItem("genpath_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("genpath_user");
    }
  }, [user]);

  const loginSuccess = useCallback(async (response: any) => {
    setIsLoading(true);
    try {
      let newUser: User | null = null;

      // Case 1: Standard GoogleLogin Component (returns ID Token/JWT)
      if (response?.credential) {
        const decoded: any = jwtDecode(response.credential);
        newUser = {
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        };
      } 
      // Case 2: Custom useGoogleLogin Hook (returns Access Token)
      else if (response?.access_token) {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${response.access_token}` },
        });
        const data = await res.json();
        newUser = {
          id: data.sub,
          name: data.name,
          email: data.email,
          picture: data.picture,
        };
      }

      if (newUser) {
        setUser(newUser);
        console.log("Real Auth: User signed in successfully:", newUser.email);
      }
    } catch (error) {
      console.error("Auth Error: Failed to retrieve user profile", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginError = useCallback(() => {
    console.error("Google Login Failed or Closed");
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        loginSuccess,
        loginError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
