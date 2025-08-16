import React, { useEffect } from "react";
import room2 from "./room2.png";
import Chat from "../../chat/Chat";
import Map from "../../map/Map";
import Login from "../login";
import ImageButton from "../button/ImageButton";
import goBackImg from "../button/go_back.png";
import goRightImg from "../button/go_right.png";
import button5Img from "../button/button5.png";
import { useAuth } from "../../../contexts/AuthContext";
import { useRoom } from "../../../contexts/RoomContext";

export default function Room2() {
  const { isLoggedIn, login, logout } = useAuth();
  const { setCurrentRoom } = useRoom();

  useEffect(() => {
    setCurrentRoom(2);
  }, [setCurrentRoom]);

  const handleLoginSuccess = (userInfo) => {
    console.log('로그인 성공 콜백 호출');
    login(userInfo);
  };

  const handleLogout = () => {
    logout();
  };

  const handleGoToRoom1 = () => {
    setCurrentRoom(1);
  };

  const handleGoToRoom3 = () => {
    setCurrentRoom(3);
  };

  const handleGoToRoom5 = () => {
    setCurrentRoom(5);
  };

  return (
    <div style={{ position: 'relative', width: '1000px', height: '800px', margin: '0 auto' }}>
      <img src={room2} alt="Room 2" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', width: '35%', height: '35%' }}>
          <Map />
        </div>
        {isLoggedIn && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '10%', height: '20%' }}>
            <Chat />
          </div>
        )}
        
        {isLoggedIn && (
          <div style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
            <ImageButton src={goRightImg} alt="옆으로" onClick={handleGoToRoom3} />
          </div>
        )}
        
        {isLoggedIn && (
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <ImageButton src={goBackImg} alt="뒤돌기" onClick={handleGoToRoom1} />
          </div>
        )}
        
        {isLoggedIn && (
          <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
            <ImageButton src={button5Img} alt="5번방으로" onClick={handleGoToRoom5} />
          </div>
        )}
        
        {!isLoggedIn && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </div>
  );
}
