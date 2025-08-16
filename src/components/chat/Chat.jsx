
import React, { useState, useEffect } from 'react';
import ChatInput from './ChatInput';
import useWebSocket from '../../hooks/useWebSocket';
import { useAuth } from '../../contexts/AuthContext';

export default function Chat() {
  const { logout } = useAuth();
  const [roomId, setRoomId] = useState(null);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('userEmail');
    setToken(storedToken);
    setUserEmail(storedEmail);
    
    // 내 채팅방 목록에서 첫 번째 방 ID 가져오기
    if (storedToken) {
      fetch('http://localhost:8080/chat/my/rooms', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      })
      .then(response => response.json())
      .then(rooms => {
        console.log('내 채팅방 목록:', rooms);
        if (rooms.length > 0) {
          setRoomId(rooms[0].roomId);
          console.log('채팅방 ID 설정:', rooms[0].roomId);
        }
      })
      .catch(error => {
        console.log('채팅방 목록 조회 오류:', error);
      });
    }
  }, []);

  const { messages, connected, sendMessage, setMessages } = useWebSocket(roomId, token);
  
  const handleSendMessage = (message) => {
    sendMessage(message, userEmail);
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
        paddingBottom: '4px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span>채팅</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '10px',
            color: connected ? '#28a745' : '#dc3545',
            fontWeight: 'normal'
          }}>
            {connected ? '연결됨' : '연결안됨'}
          </span>
          <button
            onClick={logout}
            style={{
              padding: '2px 6px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              fontSize: '10px'
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      
      <div style={{
        flex: 1,
        overflowY: 'auto',
        marginBottom: '8px',
        padding: '4px'
      }}>
        {!roomId ? (
          <div style={{ color: '#666', fontSize: '12px' }}>
            채팅방 연결 중...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ color: '#666', fontSize: '12px' }}>
            채팅을 시작해보세요!
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{
              marginBottom: '4px',
              padding: '4px',
              backgroundColor: 'rgba(240, 240, 240, 0.7)',
              borderRadius: '4px',
              fontSize: '12px',
              textAlign: 'left'
            }}>
              <span style={{ fontWeight: 'bold', color: '#007bff' }}>
                {msg.senderEmail ? msg.senderEmail.split('@')[0] : 'Unknown'}
              </span>
              <span style={{ fontSize: '10px', color: '#666' }}>
                ({new Date().toLocaleTimeString()})
              </span>
              <span style={{ color: '#333' }}>
                : {msg.message}
              </span>
            </div>
          ))
        )}
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={!roomId || !connected} />
    </div>
  );
}
