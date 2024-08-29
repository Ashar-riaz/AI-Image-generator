import React, { useState } from 'react';
import Chatbot from './Chatbot';
import Sidebar from './Sidebar';
import './index.css'; // Import Tailwind CSS styles

function App() {
  const [history, setHistory] = useState([[]]); // Start with an initial empty chat session
  const [selectedChat, setSelectedChat] = useState(0); // Select the first chat session by default

  const handleNewChat = () => {
    // Start a new chat session
    setHistory((prevHistory) => [...prevHistory, []]);
    setSelectedChat(history.length); // Select the new chat session
  };

  const handleSelectChat = (index) => {
    setSelectedChat(index);
  };

  const updateChatHistory = (newMessages) => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[selectedChat] = newMessages; // Update only the selected chat
      return newHistory;
    });
  };

  const isCurrentChatEmpty = history[selectedChat]?.length === 0;

  return (
    <div className="h-[100vh] flex">
      {/* Sidebar for chat history */}
      <Sidebar
        history={history.map((chat, index) => `Chat ${index + 1}`)} // Convert chat history to titles for the sidebar
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        disableNewChat={isCurrentChatEmpty}
      />

      {/* Main Chat Area */}
      <div className="flex-grow flex items-start">
        <Chatbot
          selectedChat={selectedChat}
          history={history}
          updateChatHistory={updateChatHistory} // Pass the update function
        />
      </div>
    </div>
  );
}

export default App;
