import React, { useState, useEffect } from 'react';

const DialogueBox = ({ text, onClose, autoClose = true, autoCloseDelay = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, onClose]);

  const handleClick = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '600px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '3px solid #333',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        fontSize: '18px',
        fontWeight: '500',
        color: '#333',
        textAlign: 'center',
        cursor: 'pointer',
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.4'
      }}
      onClick={handleClick}
    >
      {text}
      <div style={{
        fontSize: '12px',
        marginTop: '10px',
        color: '#666',
        fontStyle: 'italic'
      }}>
        클릭하여 닫기
      </div>
    </div>
  );
};

export default DialogueBox;