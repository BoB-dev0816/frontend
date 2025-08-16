import React, { useState, useEffect } from "react";
import room1 from "./room2.png";
import Chat from "../../chat/Chat";
import Map from "../../map/Map";
import Login from "../login";
import { authService } from "../../../services/authService";

export default function Room2() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = authService.isLoggedIn();
    const token = authService.getToken();
    const userEmail = authService.getUserEmail();
    
    console.log('로그인 상태 확인:', {
      isLoggedIn: loginStatus,
      hasToken: !!token,
      userEmail: userEmail
    });
    
    setIsLoggedIn(loginStatus);
  }, []);

  const handleLoginSuccess = () => {
    console.log('로그인 성공 콜백 호출');
    const loginStatus = authService.isLoggedIn();
    console.log('로그인 성공 후 상태:', loginStatus);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={room1} alt="Room 1" style={{ width: '100%', display: 'block' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '35%', height: '35%' }}>
          <Map />
        </div>
        {isLoggedIn && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '10%', height: '20%' }}>
            <Chat />
          </div>
        )}
        
        {!isLoggedIn && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        
        {isLoggedIn && (
          <div style={{ 
            position: 'absolute', 
            top: '10px', 
            left: '10px', 
            zIndex: 1000 
          }}>
            <button
              onClick={handleLogout}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
