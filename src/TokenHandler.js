import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("🚀 Full URL:", window.location.href);
    console.log("🔑 Access Token from URL:", accessToken);
    console.log("🔄 Refresh Token from URL:", refreshToken);

    if (accessToken && refreshToken) {
      console.log("✅ Tokens found! Saving to localStorage...");

      try {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("📝 Tokens successfully saved to localStorage!");

        // Remove tokens from URL to keep it clean
        navigate("/explore", { replace: true });
      } catch (error) {
        console.error("❌ Error saving tokens:", error);
      }
    } else {
      console.log("❌ No tokens found in URL.");
    }
  }, [navigate]);

  return null;
};

export default TokenHandler;
