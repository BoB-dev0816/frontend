import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (roomId, token) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!roomId || !token) return;

    const socket = new SockJS('http://localhost:8080/connect');
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: `Bearer ${token}`
      },
      debug: (str) => {
        console.log('STOMP Debug:', str);
      },
      onConnect: () => {
        console.log('WebSocket 연결됨');
        setConnected(true);

        // 채팅방 구독 (Authorization 헤더 포함)
        client.subscribe(`/topic/${roomId}`, (message) => {
          const chatMessage = JSON.parse(message.body);
          setMessages(prev => [...prev, chatMessage]);
        }, {
          Authorization: `Bearer ${token}`
        });
      },
      onStompError: (frame) => {
        console.error('STOMP Error:', frame);
        setConnected(false);
      },
      onWebSocketClose: () => {
        console.log('WebSocket 연결 종료');
        setConnected(false);
      }
    });

    clientRef.current = client;
    client.activate();

    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, [roomId, token]);

  const sendMessage = (messageContent, senderEmail) => {
    if (clientRef.current && clientRef.current.connected) {
      const message = {
        message: messageContent,
        senderEmail: senderEmail
      };

      clientRef.current.publish({
        destination: `/publish/${roomId}`,
        body: JSON.stringify(message)
      });
    }
  };

  return {
    messages,
    connected,
    sendMessage,
    setMessages
  };
};

export default useWebSocket;