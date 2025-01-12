import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ChatMobile = () => {
  const [messages] = useState([
    {
      id: 1,
      name: 'Schowalter LLC',
      message: 'You: Thank you...',
      time: '11:37am',
      link: "chat-details",
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675545/49bb166c64fe8b5ed4a14b52d7fa0540_godgpk.jpg'
    },
    {
      id: 2,
      name: 'Wuckert - Price',
      message: 'Soluta natus quispiam omnis...',
      time: '11:37am',
      link: "chat-details",
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732127824/ba7f483bdba74da74c4b90318ac19403_cjqfe2.jpg'
    },
    {
      id: 3,
      name: 'Johnston and Sons',
      message: 'Doloremque fugiat maxime r...',
      time: '11:37am',
      link: "chat-details",
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1736675548/958d3c3fcfaf510ff7bda481f103d10e_1_tl3nmj.jpg'
    },
    {
      id: 4,
      name: 'Treutel Group',
      message: 'Pariatur perferendis corpora...',
      time: '11:37am',
      link: "chat-details",
      avatar: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732326507/9d48ce83863147361d369d469dcf3993_yaemuc.jpg'
    },
  ]);

  return (
    <div className="block lg:hidden">
      {/* Chat List */}
      <div>
        <div className="px-4">
          <div className="relative hidden">
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
            <Link 
              to={`/${chat.link}`} 
              key={chat.id}
              className="block"
            >
              <div className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
                <img
                  src={chat.avatar}
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatMobile;