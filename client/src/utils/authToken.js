let memoryToken = null;

export const getAuthToken = () => {
  try {
    return localStorage.getItem("authToken") || memoryToken;
  } catch {
    return memoryToken;
  }
};

export const setAuthToken = (token) => {
  memoryToken = token;

  try {
    localStorage.setItem("authToken", token);
  } catch {
    // Keep the in-memory token as a fallback for browsers that block storage.
  }
};

export const removeAuthToken = () => {
  memoryToken = null;

  try {
    localStorage.removeItem("authToken");
  } catch {
    // Storage may be unavailable in strict/private browser modes.
  }
};
