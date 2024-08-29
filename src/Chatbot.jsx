import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false); 
  const messagesEndRef = useRef(null); 

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { text: input, type: 'user' };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setLoading(true);

    try {
      const response = await axios.post(
        'https://178c-116-90-119-33.ngrok-free.app/generate_chart',
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
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('Error generating image:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: 'bot', text: 'Failed to generate image. Please try again.' }
      ]);
    } finally {
      setLoading(false);
    }

    setInput('');
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="w-[90%] h-[95vh] shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center pb-4 bg-slate-800 rounded text-white">
        Welcome to <span className='text-blue-400'>AI</span> Image Generator
      </h1>
      <div className="flex flex-col overflow-y-auto h-[26.5rem] border-b border-gray-200 custom-scrollbar">
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
        <div ref={messagesEndRef} />
        {loading && (
          <div className="flex justify-start items-center p-24">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-8 w-8"></div>
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your instruction..."
          className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-800"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
