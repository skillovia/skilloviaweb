import React, { useState } from 'react';
import { MessageCircle, Users, Calendar, Settings, LogOut, Search, Send } from 'lucide-react';
import UserHeader from '../UserLayout/UserHeader';
import UserLayout from '../UserLayout/UserLayout';
import ChatMobile from './MessageMobile/ChatMobile';

const MessagingInterface = () => {
  const [messages] = useState([
    {
      id: 1,
      name: 'Schowalter LLC',
      message: 'You: Thank you...',
      time: '11:37am',
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg'
    },
    {
      id: 2,
      name: 'Wuckert - Price',
      message: 'Soluta natus quispiam omnis...',
      time: '11:37am',
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732127824/ba7f483bdba74da74c4b90318ac19403_cjqfe2.jpg'
    },
    {
      id: 3,
      name: 'Johnston and Sons',
      message: 'Doloremque fugiat maxime r...',
      time: '11:37am',
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675548/958d3c3fcfaf510ff7bda481f103d10e_1_tl3nmj.jpg'
    },
    {
      id: 4,
      name: 'Treutel Group',
      message: 'Pariatur perferendis corpora...',
      time: '11:37am',
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732326507/9d48ce83863147361d369d469dcf3993_yaemuc.jpg'
    },
  
  ]);

  const [selectedChat] = useState({
    messages: [
      {
        id: 1,
        text: 'Hi, Good Morning',
        sender: 'them',
        time: '11:37am'
      },
      {
        id: 2,
        text: 'Alright, I"ve received your order\nIll see you tomorrow at 8pm',
        sender: 'them',
        time: '11:38am'
      },
      {
        id: 3,
        text: 'Hi, Good Morning\nI just booked you for tomorrow',
        sender: 'user',
        time: '11:39am'
      },
      {
        id: 4,
        text: 'Thank you,\nI look forward to see you',
        sender: 'user',
        time: '11:40am'
      }
    ]
  });

  return (
    <>
 <UserLayout>

 
    <div className=" hidden lg:flex h-screen px-[6rem] pt-[4rem]">


      {/* Chat List */}
      <div className="w-80 ">
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
          {messages.map((chat) => (
            <div
              key={chat.id}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer "
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full object-cover
                "
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{chat.name}</h3>
                  <span className="text-sm text-gray-500">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-input rounded ">
        {/* Chat Header */}
        <div className="flex items-center p-4  bg-gray-50">
          <img
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg"
            alt="Selected chat"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="ml-4 font-medium">Schowalter LLC</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {selectedChat.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-800'
                }`}
              >
                <p className="whitespace-pre-line">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-gray-50 fixed bottom-0 w-[40%]">
          <div className="relative">
            <input
              type="text"
              placeholder="Write a message"
              className="w-full pl-4 pr-12 py-2 bg-input border-gray shadow-sm rounded-lg border focus:outline-none focus:border-green-500"
            />
            <button className="absolute right-2 top-2 text-green-500 hover:text-green-600">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>

    <ChatMobile />

    </UserLayout>
    </>
  );
};

export default MessagingInterface;