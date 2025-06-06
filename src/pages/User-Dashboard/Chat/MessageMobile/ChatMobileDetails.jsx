import React, { useEffect, useState, useRef } from "react";
import { ArrowLeft, Loader2, Send } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout/UserLayout";

import { jwtDecode } from "jwt-decode"; // Ensure jwt-decode is imported

const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, userName, userPhoto } = location.state || {};
  const messagesEndRef = useRef(null);
  const pollingInterval = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // const getSenderId = () => {
  //   try {
  //     const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
  //     return decodedToken?.id;
  //   } catch (error) {
  //     console.error('Error getting sender ID:', error);
  //     return null;
  //   }
  // };

  const getSenderId = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Decode the access token to get the user ID (assuming it's a JWT)
      const decodedToken = jwtDecode(accessToken);
      return decodedToken?.id;
    } catch (error) {
      console.error("Error getting sender ID:", error);
      return null;
    }
  };

  const markMessagesAsRead = async (messages) => {
    const currentUserId = getSenderId();
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const unreadMessages = messages.filter(
      (msg) => msg.sender_id !== currentUserId && !msg.mark_as_read
    );

    for (const msg of unreadMessages) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/message/markasread/${msg.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Failed to mark message as read:", msg.id);
        }
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    }
  };

  const fetchNewMessages = async () => {
    try {
      const senderId = getSenderId();
      if (!senderId || !userId) return;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/message/${senderId}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      if (data.data && data.data.length > messages.length) {
        setMessages(data.data);
        markMessagesAsRead(data.data);
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error fetching new messages:", error);
      if (error.message.includes("token")) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const senderId = getSenderId();
        if (!senderId || !userId) {
          throw new Error("Sender ID or User ID not found");
        }

        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/message/${senderId}/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch chat history");
        }

        const data = await response.json();
        if (data.data) {
          setMessages(data.data);
          markMessagesAsRead(data.data);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        if (error.message.includes("token") || error.message.includes("ID")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchChatHistory();
      pollingInterval.current = setInterval(fetchNewMessages, 3000);
    }

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
  }, [userId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const senderId = getSenderId();
    if (!senderId) {
      navigate("/login");
      return;
    }

    const newMessage = {
      senderId: senderId,
      receiverId: userId,
      content: message,
      mark_as_read: false,
    };

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data.data]);
      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.message.includes("token")) {
        navigate("/login");
      }
    }
  };

  const currentUserId = getSenderId();

  return (
    <>
      <UserLayout>
        <div className="lg:flex flex-col h-screen max-w-4xl mx-auto bg-[#F6FCEB] relative hidden">
          {/* Header */}
          <div className="border border-gray text-slate-800 p-4 flex items-center space-x-4">
            <Link
              to="/messages"
              className="hover:bg-green-700 p-1 rounded-full"
            >
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center text-green-600 font-medium">
                <img
                  src={
                    userPhoto ||
                    "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                  }
                  className="rounded-full h-8 w-8 object-cover"
                  alt={userName}
                />
              </div>
              <span className="font-medium">{userName}</span>
            </div>
          </div>

          {/* Messages Container with Fixed Height */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-4"
            style={{ height: "calc(100vh - 140px)" }}
          >
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender_id === currentUserId
                      ? "items-end"
                      : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                      msg.sender_id === currentUserId
                        ? "bg-secondary text-white"
                        : "bg-input text-black"
                    }`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(
                      Number(msg.createdAt?.$date?.$numberLong)
                    ).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Fixed at Bottom */}
          <div className="border-t border-gray bg-[#F6FCEB] p-4">
            <form
              onSubmit={handleSubmit}
              className="flex items-center space-x-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 bge rounded-full px-4 py-2 border border-gray focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="submit"
                className="bg-secondary text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </UserLayout>

      <div className="flex flex-col h-screen bg-[#F6FCEB] max-w-md mx-auto  relative lg:hidden">
        <div className="border border-gray text-slate-800 p-4 flex items-center space-x-4">
          <Link to="/messages" className="hover:bg-green-700 p-1 rounded-full">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center text-green-600 font-medium">
              <img
                src={
                  userPhoto ||
                  "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                }
                className="rounded-full h-8 w-8 object-cover"
                alt={userName}
              />
            </div>
            <span className="font-medium">{userName}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="animate-spin" />
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender_id === currentUserId ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                    msg.sender_id === currentUserId
                      ? "bg-secondary text-white"
                      : "bg-input text-black"
                  }`}
                >
                  {msg.content}
                </div>
                {/*<span className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </span>*/}

                <span className="text-xs text-gray-500 mt-1">
                  {new Date(
                    Number(msg.createdAt?.$date?.$numberLong)
                  ).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="bg-gray-100 border-t border-gray p-4 bg-[#F6FCEB] fixed bottom-[3rem] w-full ">
          <form
            onSubmit={handleSubmit}
            className="flex items-center  space-x-2"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bge rounded-full px-4 py-2 border border-gray focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-secondary text-white p-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
