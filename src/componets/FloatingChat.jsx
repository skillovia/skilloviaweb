import React from "react";
import { MessageCircleMore } from "lucide-react";

const FloatingChatButton = ({ onClick, disabled }) => (
  <button
    className="fixed bottom-20 right-6 z-50 bg-secondary text-white rounded-full shadow-lg p-4 flex items-center hover:bg-secondary/90 transition disabled:opacity-60"
    onClick={onClick}
    disabled={disabled}
    aria-label="Chat"
    type="button"
    style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
  >
    <MessageCircleMore className="w-6 h-6" />
  </button>
);

export default FloatingChatButton;