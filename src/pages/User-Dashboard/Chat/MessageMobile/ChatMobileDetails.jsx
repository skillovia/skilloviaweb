import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChatInterface = () => {
  const [message, setMessage] = useState('');
  const messages = [
    {
      id: 1,
      text: 'Hi, Good Morning',
      sender: 'user',
      timestamp: 'Today'
    },
    {
      id: 2,
      text: 'Hi, Good Morning\nI just booked you for tomorrow',
      sender: 'other',
      timestamp: ''
    },
    {
      id: 3,
      text: 'Alright, Ive received your order\nIll see you tomorrow at 8pm',
      sender: 'user',
      timestamp: ''
    },
    {
      id: 4,
      text: 'Thank you.\nI look forward to see you',
      sender: 'other',
      timestamp: ''
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Handle message submission here
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen  max-w-md mx-auto relative">
      {/* Header */}
      <div className="bg-input text-slate-800 p-4 flex items-center space-x-4">
        <Link to ='/messages' className="hover:bg-green-700 p-1 rounded-full">
          <ArrowLeft size={24} />
        </Link>
        <div className="flex items-center space-x-3">
          <div className=" flex items-center justify-center text-green-600 font-medium">
            <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg" className='rounded-full h-8 w-8 object-cover' alt="" />
          </div>
          <span className="font-medium">Schowalter LLC</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex flex-col ${msg.sender === 'other' ? 'items-start' : 'items-end'}`}
          >
            {msg.timestamp && (
              <div className="text-xs text-gray-500 mb-1 text-center w-full">
                {msg.timestamp}
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-lg p-3 whitespace-pre-line ${
                msg.sender === 'other'
                  ? 'bg-input text-black'
                  : 'bg-secondary text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Message Input */}
      <div className="bg-gray-100 border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
  );
};

export default ChatInterface;