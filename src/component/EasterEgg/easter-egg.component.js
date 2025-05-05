// src/component/EasterEgg/EasterEgg.js
import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './easter-egg.component.css'; // Create this CSS file

const EasterEgg = ({ onComplete }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    // Get window dimensions for confetti
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({ width, height });

    // Set a timer to stop confetti and call onComplete
    const timer = setTimeout(() => {
      setShowConfetti(false);
      if (onComplete) {
        onComplete(); // Signal completion
      }
    }, 5000); // Show confetti for 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [onComplete]);

  return (
    <div className={`easter-egg-container ${showConfetti ? 'visible' : ''}`}>
      {showConfetti && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          recycle={false} // Don't recycle confetti pieces
          numberOfPieces={400} // More pieces!
          gravity={0.2}
        />
      )}
       {/* Optional: Add a funny message */}
      <div className="easter-egg-message">
        Konami Activated! 🎉 <br/> Hiring manager powers +10!
      </div>
    </div>
  );
};

export default EasterEgg;