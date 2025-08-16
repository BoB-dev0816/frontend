import React, { useState } from 'react';

const CTFModal = ({ isOpen, onClose, onSuccess, question = "1+1은?", answer = "2" }) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim().toLowerCase() === answer.toLowerCase()) {
      setShowError(false);
      onSuccess();
      setUserAnswer('');
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const handleClose = () => {
    setUserAnswer('');
    setShowError(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        border: '2px solid #00ff00',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        color: '#00ff00',
        fontFamily: 'monospace',
        fontSize: '16px',
        boxShadow: '0 0 20px rgba(0, 255, 0, 0.3)'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '20px',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#ffffff'
        }}>
          🏴 CTF Challenge 🏴
        </div>
        
        <div style={{
          marginBottom: '20px',
          padding: '15px',
          backgroundColor: '#0a0a0a',
          border: '1px solid #333',
          borderRadius: '4px'
        }}>
          <div style={{ marginBottom: '10px', color: '#ffff00' }}>
            Question:
          </div>
          <div style={{ fontSize: '18px' }}>
            {question}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#ffff00' }}>
              Answer:
            </label>
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#0a0a0a',
                border: '1px solid #333',
                borderRadius: '4px',
                color: '#00ff00',
                fontFamily: 'monospace',
                fontSize: '16px'
              }}
              placeholder="Enter your answer..."
              autoFocus
            />
          </div>

          {showError && (
            <div style={{
              color: '#ff0000',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: '14px'
            }}>
              ❌ Incorrect answer. Try again!
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}>
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#00ff00',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'monospace',
                fontWeight: 'bold'
              }}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#333',
                color: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: 'monospace'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CTFModal;