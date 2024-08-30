import React, { useEffect } from 'react';


const Sidebar = ({ history, onSelectChat, onNewChat, disableNewChat, onDeleteChat }) => {

  return (
    <div className="w-[30vw] h-full bg-gray-800 text-white p-4 overflow-y-auto custom-scrollbar">
              <button
        onClick={onNewChat}
        className="mt-4 bg-slate-400 text-white px-4 py-2 rounded-lg hover:bg-slate-700"
        disabled={disableNewChat}
      >
        New Chat
      </button>
      <h2 className="text-lg font-semibold mb-4">Chat History</h2>
      <ul>
        {history.map((chat, index) => (
        <li
        key={index}
        className="p-2 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 flex justify-between items-center"
      >
        <span onClick={() => onSelectChat(index)} className="flex-grow cursor-pointer">
          {chat}
        </span>
        <button
          className="bg-slate-400 text-white px-2 py-1 rounded ml-2 hover:bg-slate-700"
          onClick={() => onDeleteChat(index)} 
        >
          X
        </button>
      </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
