import React, { useEffect } from 'react';


const Sidebar = ({ history, onSelectChat, onNewChat, disableNewChat  }) => {
    useEffect(()=>{
        console.log('history',history);
    },[history])

  return (
    <div className="w-96 h-full bg-gray-800 text-white p-4 overflow-y-auto custom-scrollbar">
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
            className="p-2 mb-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600"
            onClick={() => onSelectChat(index)}
          >
            {chat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
