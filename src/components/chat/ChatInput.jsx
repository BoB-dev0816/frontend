import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      width: '100%',
      marginTop: '8px'
    }}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="메시지를 입력하세요..."
        style={{
          flex: 1,
          padding: '6px 8px',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          outline: 'none'
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '4px',
          padding: '6px 12px',
          fontSize: '12px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          opacity: 0.9
        }}
      >
        전송
      </button>
    </form>
  );
};

export default ChatInput;