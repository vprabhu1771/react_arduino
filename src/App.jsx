// src/App.jsx
import React, { useState } from 'react';

import './App.css'

function App() {
  // Initialize isBlinking to 0 (LED is off)
  const [isBlinking, setIsBlinking] = useState(0);

  const toggleLed = async () => {
    
    // Calculate new state: if isBlinking is 0, set it to 1; otherwise set it to 0
    const newBlinkState = isBlinking === 0 ? 1 : 0;
    
    setIsBlinking(newBlinkState); // Update state
    
    // alert(newBlinkState);

    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/blink-led`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blink: newBlinkState.toString() }), // Pass blink state as a string
      });
    } catch (error) {
      console.error('Error toggling LED:', error);
    }

  };

  return (
    <div className="App">

      <h1>Arduino LED Controller</h1>

      <button onClick={toggleLed}>
        {isBlinking === 1 ? 'Stop Blinking' : 'Start Blinking'}
      </button>

    </div>
  );
}

export default App;