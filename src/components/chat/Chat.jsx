
import React, { useState } from 'react';
import ChatInput from './ChatInput';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState('user0');

  const handleSendMessage = (message) => {
    const newMessage = {
      id: Date.now(),
      userId: userId,
      text: message,
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: '300px',
      height: '200px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      border: '1px solid rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      padding: '12px',
      display: 'flex',
      flexDirection: 'column',
      fontSize: '14px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <div style={{
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#333',
        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        paddingBottom: '4px'
      }}>
        채팅
      </div>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '8px',
        padding: '4px'
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#666', fontSize: '12px' }}>
            채팅을 시작해보세요!
          </div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} style={{
              marginBottom: '6px',
              padding: '6px',
              backgroundColor: 'rgba(240, 240, 240, 0.7)',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                marginBottom: '2px'
              }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>
                  {msg.userId}
                </span>
                <span style={{ fontSize: '10px', color: '#666' }}>
                  {msg.timestamp}
                </span>
              </div>
              <div style={{ color: '#333' }}>
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
