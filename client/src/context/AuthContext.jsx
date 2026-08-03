import { useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  googleLoginUser,
} from "../services/authService";
import { AuthContext } from "./AuthContextValue";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();

        if (isMounted) {
          setUser(data.user);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (formData) => {
    const data = await loginUser(formData);

    setUser(data.user);

    return data.user;
  };

  const register = async (formData) => {
    const data = await registerUser(formData);

    setUser(data.user);

    return data.user;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);

    return true;
  };

  const googleLogin = async (credential) => {
    const data = await googleLoginUser(credential);

    setUser(data.user);

    return data.user;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        googleLogin,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
