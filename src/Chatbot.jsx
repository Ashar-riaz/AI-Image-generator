

//working with side bar 

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ selectedChat, history, updateChatHistory }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (selectedChat !== null && history[selectedChat]) {
      setMessages(history[selectedChat]); // Load selected chat history
    }
  }, [selectedChat, history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, type: 'user' };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages); // Update local messages state
    updateChatHistory(updatedMessages); // Save to history

    try {
      const response = await axios.post(
        'https://277f-116-90-119-33.ngrok-free.app/generate_chart',
        { query: input },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      const imageUrl = URL.createObjectURL(response.data);
      const botMessage = { type: 'bot', imageUrl };
      const newMessagesWithBot = [...updatedMessages, botMessage];
      setMessages(newMessagesWithBot);
      updateChatHistory(newMessagesWithBot); // Save to history
    } catch (error) {
      console.error('Error generating image:', error);
      const errorMessage = { type: 'bot', text: 'Failed to generate image. Please try again.' };
      const newMessagesWithError = [...updatedMessages, errorMessage];
      setMessages(newMessagesWithError);
      updateChatHistory(newMessagesWithError); // Save to history
    }

    setInput('');
  };

  return (
    <div className="w-full shadow-md rounded-lg bg-white">
      <h1 className="text-3xl font-semibold text-center pb-4 bg-slate-800 text-white">
        InsightAI Graph
      </h1>
      <div className="flex flex-col overflow-y-auto h-[82vh] border-b custom-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex p-2 ${
              msg.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.type === 'user' ? (
              <p className="bg-slate-800 text-white p-4 rounded-lg max-w-xs">{msg.text}</p>
            ) : msg.imageUrl ? (
              <img src={msg.imageUrl} alt="Generated" className="max-w-xs rounded-lg shadow" />
            ) : (
              <p className="bg-gray-200 p-4 rounded-lg max-w-xs">{msg.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 px-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your instruction..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
        />
        <button
          onClick={handleSend}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;

