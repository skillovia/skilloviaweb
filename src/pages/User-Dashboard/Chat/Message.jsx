

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Search, Send, Loader2 } from "lucide-react";
import UserLayout from "../UserLayout/UserLayout";
import ChatMobile from "./MessageMobile/ChatMobile";
import { jwtDecode } from "jwt-decode";
import { IoLogoWechat } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const MessagingInterface = () => {

  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const pollingInterval = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getSenderId = () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
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
          `${import.meta.env.VITE_BASE_URL}/message/markasread/${msg._id}`,
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
    if (!selectedChat?.userId) return;

    try {
      const senderId = getSenderId();
      if (!senderId) return;

      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/message/${senderId}/${
          selectedChat.userId
        }`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      if (
        data.data &&
        (!selectedChat.messages ||
          data.data.length > selectedChat.messages.length)
      ) {
        setSelectedChat((prev) => ({
          ...prev,
          messages: data.data,
        }));
        markMessagesAsRead(data.data);
        scrollToBottom();
      }
    } catch (err) {
      console.error("Error fetching new messages:", err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/message/chat/history/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          const formattedUsers = data.data.map((user) => ({
            id: user.user_id,
            name: user.name,
            time: formatTime(user.lastMessageTime),
            unreadCount: user.unreadMessageCount || 0,
            photoUrl: user.photourl
              ? `${user.photourl}`
              : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg",
          }));
          setMessages(formattedUsers);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    return () => {
      if (pollingInterval.current) {
        clearInterval(pollingInterval.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedChat?.userId) {
      fetchNewMessages();
      scrollToBottom();

      pollingInterval.current = setInterval(fetchNewMessages, 3000);

      return () => {
        if (pollingInterval.current) {
          clearInterval(pollingInterval.current);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat?.userId]);

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);

    if (diffMinutes < 60) {
      return `${diffMinutes <= 0 ? 1 : diffMinutes} min${
        diffMinutes === 1 ? "" : "s"
      } ago`;
    }
    // If today, show time
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return date
        .toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .toLowerCase();
    }
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }
    // Else, show date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const fetchChatHistory = async (userId) => {
    setChatLoading(true);
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
      setSelectedChat({
        userId,
        messages: data.data || [],
      });
      markMessagesAsRead(data.data || []);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching chat history:", error);
      setError(error.message);
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat || sendingMessage) return;

    setSendingMessage(true);
    const senderId = getSenderId();
    if (!senderId) return;

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
        body: JSON.stringify({
          senderId: senderId,
          receiverId: selectedChat.userId,
          content: newMessage,
          mark_as_read: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, data.data],
      }));
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message);
    } finally {
      setSendingMessage(false);
    }
  };

  const currentUserId = getSenderId();

  // Helper for date formatting for chat bubbles (from ChatInterface)
  const getMessageTime = (msg) => {
    let dateValue = msg.createdAt ?? msg.created_at;
    if (dateValue?.$date?.$numberLong) {
      return new Date(Number(dateValue.$date.$numberLong)).toLocaleTimeString();
    }
    if (typeof dateValue === "string") {
      const d = new Date(dateValue);
      return isNaN(d.getTime()) ? "" : d.toLocaleTimeString();
    }
    return "";
  };

  const handleUserClick = (userId) => {
    if (!userId) {
      alert("Invalid user ID.");
      return;
    }
    navigate(`/user-profile/${userId}`);
  };


  return (
    <UserLayout>
      <div className="hidden lg:flex h-screen px-[6rem] pt-[4rem]">
        {/* Chat List */}
        <div className="w-80 shadow ">
          <div className="p-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-input border-gray focus:outline-none focus:border-green-500"
              />
            </div>
          </div>
          <div className="overflow-y-auto px-3">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center flex flex-col text-secondary items-center h-[20rem] justify-center text-gray-400">
                <IoLogoWechat
                  size={48}
                  className="mx-auto mb-2 text-secondary"
                />
                <span>
                  No messages for now... they'll appear here when you have them
                </span>
              </div>
            ) : (
              messages.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center border bg-input rounded-lg border-gray p-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => fetchChatHistory(chat.id)}
                >
                  <img
                    src={chat.photoUrl}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <span className="b">
                        <h3 className="font-medium">{chat.name}</h3>
                        <p className="text-sm text-gray-500">{chat.time}</p>
                      </span>
                      <span className="block">
                        {chat.unreadCount > 0 && (
                          <span className="bg-green-500  text-white text-sm font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                            {chat.unreadCount}
                          </span>
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 truncate">
                      {chat.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-input rounded h-[calc(100vh-4rem)] min-h-0">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div onClick={() => handleUserClick(selectedChat.userId)} className="flex cursor-pointer border-b border-gray items-center p-4 bg-gray-50 flex-shrink-0">
                <img
                  src={
                    messages.find((m) => m.id === selectedChat.userId)?.photoUrl
                  }
                  alt="Selected chat"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="ml-4 font-medium">
                  {messages.find((m) => m.id === selectedChat.userId)?.name}
                </h2>
              </div>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                  </div>
                ) : selectedChat.messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <MessageCircle size={48} className="mx-auto mb-2" />
                    <span>No messages yet</span>
                  </div>
                ) : (
                  selectedChat.messages.map((msg) => {
                    const isCurrentUser =
                      msg.sender_id === currentUserId ||
                      msg.senderId === currentUserId;
                    return (
                      <div
                        key={msg._id}
                        className={`flex flex-col ${
                          isCurrentUser ? "items-end" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 whitespace-pre-line ${
                            isCurrentUser
                              ? "bg-secondary text-white rounded-lg rounded-br-none"
                              : "bg-slate-300  text-gray-800 rounded-lg rounded-bl-none"
                          }`}
                        >
                          {msg.content}
                          <span className="text-xs block text-gray-500 mt-1">
                            {getMessageTime(msg)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>
              {/* Message Input */}
              <div className="p-4 bg-gray-50 flex-shrink-0 sticky bottom-0 left-0 right-0 z-10">
                <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a message"
                    className="w-full pl-4 pr-12 py-2 bg-input border-gray shadow-sm rounded-lg border focus:outline-none focus:border-green-500"
                    disabled={sendingMessage}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 text-green-500 hover:text-green-600 disabled:opacity-50"
                    disabled={sendingMessage}
                  >
                    {sendingMessage ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send size={20} />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
      <ChatMobile />
    </UserLayout>
  );
};

export default MessagingInterface;
