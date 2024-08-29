import React, { useState } from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import './index.css';

function App() {
  const [history, setHistory] = useState([[]]);
  const [selectedChat, setSelectedChat] = useState(0);

  const handleNewChat = () => {
    setHistory((prevHistory) => [...prevHistory, []]);
    setSelectedChat(history.length);
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

  const updateChatHistory = (newMessages) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[selectedChat] = newMessages;
      return newHistory;
    });
  };

  const handleDeleteChat = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    if (selectedChat === index) {
      setSelectedChat(null);
    } else if (selectedChat > index) {
      setSelectedChat(selectedChat - 1);
    }
  };

  const isCurrentChatEmpty = history[selectedChat]?.length === 0;

  return (
    <div className="h-[100vh] flex">
      <Sidebar
        history={history.map((chat, index) => `Chat ${index + 1}`)}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        disableNewChat={isCurrentChatEmpty}
        onDeleteChat={handleDeleteChat}
      />

      <div className="flex-grow flex items-start">
        <Chatbot
          selectedChat={selectedChat}
          history={history}
          updateChatHistory={updateChatHistory}
        />
      </div>
    </div>
  );
}

export default App;
