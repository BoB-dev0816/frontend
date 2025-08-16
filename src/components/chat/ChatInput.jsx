import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
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
        placeholder={disabled ? "연결 중..." : "메시지를 입력하세요..."}
        disabled={disabled}
        style={{
          flex: 1,
          padding: '6px 8px',
          fontSize: '12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: disabled ? 'rgba(240, 240, 240, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          outline: 'none',
          opacity: disabled ? 0.6 : 1
        }}
      />
      <button
        type="submit"
        disabled={disabled}
        style={{
          marginLeft: '4px',
          padding: '6px 12px',
          fontSize: '12px',
          backgroundColor: disabled ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 0.9
        }}
      >
        전송
      </button>
    </form>
  );
};

export default ChatInput;