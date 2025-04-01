import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

const baseUrl = import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="454556204234-j1lqea5kjrmp8asb3gij9p4r3ombvaej.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
