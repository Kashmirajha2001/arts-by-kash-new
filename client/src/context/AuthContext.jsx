import { createContext, useEffect, useState } from "react";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
  googleLoginUser,
} from "../services/authService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      const data = await getCurrentUser();

      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (formData) => {
    await loginUser(formData);

    const currentUser = await getCurrentUser();

    setUser(currentUser.user);

    return currentUser.user;
  };

  const register = async (formData) => {
    await registerUser(formData);

    const currentUser = await getCurrentUser();

    setUser(currentUser.user);

    return currentUser.user;
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);

    return true;
  };

  const googleLogin = async (credential) => {
    await googleLoginUser(credential);

    const currentUser = await getCurrentUser();

    setUser(currentUser.user);

    return currentUser.user;
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
