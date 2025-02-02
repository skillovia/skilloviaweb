import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Send, Loader2 } from 'lucide-react';
import UserLayout from '../UserLayout/UserLayout';
import ChatMobile from './MessageMobile/ChatMobile';

const MessagingInterface = () => {
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatLoading, setChatLoading] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  // Get sender ID from stored decoded token
  const getSenderId = () => {
    try {
      const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
      return decodedToken?.id;
    } catch (error) {
      console.error('Error getting sender ID:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await fetch('https://testapi.humanserve.net/api/message/chat/history/users', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        
        if (data.status === 'success' && Array.isArray(data.data)) {
          const formattedUsers = data.data.map(user => ({
            id: user.user_id,
            name: user.name,
            message: user.lastmessage || 'Recent..',
            time: formatTime(user.lastmessagetime) || '1 mins',
            unreadCount: user.unreadmessagecount || 0,
            photoUrl: user.photourl 
              ? `https://${user.photourl}`
              : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'
          }));
          setMessages(formattedUsers);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    }).toLowerCase();
  };

  const fetchChatHistory = async (userId) => {
    setChatLoading(true);
    try {
      const senderId = getSenderId();
      if (!senderId || !userId) {
        throw new Error('Sender ID or User ID not found');
      }

      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/message/${senderId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch chat history');
      }

      const data = await response.json();
      setSelectedChat({
        userId,
        messages: data.data || []
      });
    } catch (error) {
      console.error('Error fetching chat history:', error);
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
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          senderId: senderId,
          receiverId: selectedChat.userId,
          content: newMessage,
          mark_as_read: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setSelectedChat(prev => ({
        ...prev,
        messages: [...prev.messages, data.data]
      }));
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError(error.message);
    } finally {
      setSendingMessage(false);
    }
  };

  const currentUserId = getSenderId();

  return (
    <UserLayout>
      <div className="hidden lg:flex h-screen px-[6rem] pt-[4rem]">
        {/* Chat List */}
        <div className="w-80">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 border rounded-full bg-input border-gray focus:outline-none focus:border-green-500"
              />
            </div>
          </div>

          <div className="overflow-y-auto">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">
                {error}
              </div>
            ) : (
              messages.map((chat) => (
                <div
                  key={chat.id}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => fetchChatHistory(chat.id)}
                >
                  <img
                    src={chat.photoUrl}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{chat.name}</h3>
                      <span className="text-sm text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 flex flex-col bg-input rounded">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center p-4 bg-gray-50">
                <img
                  src={messages.find(m => m.id === selectedChat.userId)?.photoUrl}
                  alt="Selected chat"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <h2 className="ml-4 font-medium">
                  {messages.find(m => m.id === selectedChat.userId)?.name}
                </h2>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                  </div>
                ) : (
                  selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg p-3 ${
                          message.sender_id === currentUserId
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.content}</p>
                        <span className="text-xs opacity-75 mt-1 block">
                          {formatTime(message.created_at)}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-gray-50">
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