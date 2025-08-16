import React, { useEffect } from "react";
import room7 from "./room7.png";
import button8Img from "../button/button8.png";
import Chat from "../../chat/Chat";
import Map from "../../map/Map";
import Login from "../login";
import ImageButton from "../button/ImageButton";
import goBackImg from "../button/go_back.png";
import DialogueBox from "../../dialogue/DialogueBox";
import CTFModal from "../../ctf/CTFModal";
import { useAuth } from "../../../contexts/AuthContext";
import { useRoom } from "../../../contexts/RoomContext";

export default function Room7() {
  const { isLoggedIn, login, logout } = useAuth();
  const { setCurrentRoom } = useRoom();
  const [showDialogue, setShowDialogue] = React.useState(false);
  const [showCTFModal, setShowCTFModal] = React.useState(false);
  const [hasCompletedCTF, setHasCompletedCTF] = React.useState(false);

  useEffect(() => {
    setCurrentRoom(7);
    if (isLoggedIn) {
      setShowDialogue(true);
    }
  }, [setCurrentRoom, isLoggedIn]);

  const handleLoginSuccess = (userInfo) => {
    console.log('로그인 성공 콜백 호출');
    login(userInfo);
  };

  const handleLogout = () => {
    logout();
  };

  const handleGoToRoom4 = () => {
    setCurrentRoom(4);
  };

  const handleGoToRoom8 = () => {
    if (!hasCompletedCTF) {
      setShowCTFModal(true);
    } else {
      setCurrentRoom(8);
    }
  };

  const handleCloseDialogue = () => {
    setShowDialogue(false);
  };

  const handleCTFSuccess = () => {
    setHasCompletedCTF(true);
    setShowCTFModal(false);
    setCurrentRoom(8);
  };

  const handleCTFClose = () => {
    setShowCTFModal(false);
  };

  return (
    <div style={{ position: 'relative', width: '1000px', height: '800px', margin: '0 auto' }}>
      <img src={room7} alt="Room 7" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <ImageButton src={goBackImg} alt="뒤로가기" onClick={handleGoToRoom4} />
          </div>
        )}
        
        {isLoggedIn && (
          <div style={{ position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)' }}>
            <ImageButton src={button8Img} alt="8번방으로" onClick={handleGoToRoom8} />
          </div>
        )}
        
        {!isLoggedIn && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {showDialogue && (
          <DialogueBox 
            text="에어컨은 꺼져있고 방이 너무 덥다. 8번 방에 들어가보자" 
            onClose={handleCloseDialogue}
            autoClose={true}
            autoCloseDelay={4000}
          />
        )}

        <CTFModal
          isOpen={showCTFModal}
          onClose={handleCTFClose}
          onSuccess={handleCTFSuccess}
          question="10진수 16을 2진수로 변환하면?"
          answer="10000"
        />
      </div>
    </div>
  );
}