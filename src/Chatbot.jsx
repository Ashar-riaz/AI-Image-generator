import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = ({ selectedChat, history, updateChatHistory }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false); 
    const messagesEndRef = useRef(null); 


      useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedChat !== null && history[selectedChat]) {
      setMessages(history[selectedChat]);
    }
  }, [selectedChat, history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, type: 'user' };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    updateChatHistory(updatedMessages);
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}generate_chart`,
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
      updateChatHistory(newMessagesWithBot);
    } catch (error) {
      console.error('Error generating image:', error);
      const errorMessage = { type: 'bot', text: 'Failed to generate image. Please try again.' };
      const newMessagesWithError = [...updatedMessages, errorMessage];
      setMessages(newMessagesWithError);
      updateChatHistory(newMessagesWithError);
    }finally{
        setLoading(false);
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
              <p className="bg-slate-800 text-white p-4 rounded-lg max-w-lg">{msg.text}</p>
            ) : msg.imageUrl ? (
              <img src={msg.imageUrl} alt="Generated" className="max-w-lg rounded-lg shadow" />
            ) : (
              <p className="bg-gray-200 p-4 rounded-lg max-w-lg">{msg.text}</p>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
           {loading && (
     <div className="flex justify-start items-center p-24">
       <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
      </div>
        )}
        
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