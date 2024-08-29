import React from 'react';
import Chatbot from './Chatbot';
import './index.css'; // Import Tailwind CSS styles

function App() {
  return (
    <div className="h-[100vh] bg-gray-100 flex items-center justify-center">
      <Chatbot />
    </div>
  );
}

export default App;
