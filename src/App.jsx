import React from 'react';
import Chatbot from './Chatbot';
import './index.css'; // Import Tailwind CSS styles
const backgroundImageUrl = '../public/artificial-intelligence-codes-developing-screen.jpg';

function App() {
  return (
    <div className="h-[100vh] bg-gray-100 flex items-center justify-center"
    style={{
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Chatbot />
    </div>
  );
}

export default App;
