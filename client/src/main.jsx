import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/globals.css";
import "./styles/typography.css";

import App from "./App";
import AuthProvider from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
      {/* <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 3000,

          style: {
            background: "#fffdf9",
            color: "#3b3128",
            border: "1px solid #e8dccd",
            borderRadius: "16px",
            padding: "16px 18px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            fontSize: "15px",
            fontWeight: "500",
          },

          success: {
            iconTheme: {
              primary: "#7b5e45",
              secondary: "#fffdf9",
            },
          },

          error: {
            iconTheme: {
              primary: "#b14646",
              secondary: "#fffdf9",
            },
          },
        }}
      /> */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          top: 85,
        }}
        toastOptions={{
          duration: 3000,

          style: {
            background: "#fffdf9",
            color: "#3b3128",
            border: "1px solid #e8dccd",
            borderRadius: "16px",
            padding: "10px 15px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
            fontSize: "10px",
            fontWeight: "500",
          },

          success: {
            iconTheme: {
              primary: "#449a33",
              secondary: "#fffdf9",
            },
          },

          error: {
            iconTheme: {
              primary: "#b14646",
              secondary: "#fffdf9",
            },
          },
        }}
      />
    </AuthProvider>
  </StrictMode>,
);
