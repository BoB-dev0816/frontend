import React, { useEffect } from "react";
import room1 from "./room1.png";
import button4Img from "../button/button4.png";
import Chat from "../../chat/Chat";
import Map from "../../map/Map";
import Login from "../login";
import ImageButton from "../button/ImageButton";
import goBackImg from "../button/go_back.png";
import goRightImg from "../button/go_right.png";
import DialogueBox from "../../dialogue/DialogueBox";
import CTFModal from "../../ctf/CTFModal";
import { useAuth } from "../../../contexts/AuthContext";
import { useRoom } from "../../../contexts/RoomContext";

export default function Room1() {
  const { isLoggedIn, login, logout } = useAuth();
  const { setCurrentRoom } = useRoom();
  const [showDialogue, setShowDialogue] = React.useState(false);
  const [hasShownDialogue, setHasShownDialogue] = React.useState(false);
  const [showCTFModal, setShowCTFModal] = React.useState(false);
  const [hasCompletedCTF, setHasCompletedCTF] = React.useState(false);

  useEffect(() => {
    setCurrentRoom(1);
  }, [setCurrentRoom]);

  useEffect(() => {
    if (isLoggedIn && !hasShownDialogue) {
      setShowDialogue(true);
      setHasShownDialogue(true);
    }
  }, [isLoggedIn, hasShownDialogue]);

  const handleLoginSuccess = (userInfo) => {
    console.log('로그인 성공 콜백 호출');
    login(userInfo);
  };

  const handleLogout = () => {
    logout();
  };

  const handleGoToRoom2 = () => {
    setCurrentRoom(2);
  };

  const handleGoToRoom3 = () => {
    setCurrentRoom(3);
  };

  const handleGoToRoom4 = () => {
    if (!hasCompletedCTF) {
      setShowCTFModal(true);
    } else {
      setCurrentRoom(4);
    }
  };

  const handleCloseDialogue = () => {
    setShowDialogue(false);
  };

  const handleCTFSuccess = () => {
    setHasCompletedCTF(true);
    setShowCTFModal(false);
    setCurrentRoom(4);
  };

  const handleCTFClose = () => {
    setShowCTFModal(false);
  };

  return (
    <div style={{ position: 'relative', width: '1000px', height: '800px', margin: '0 auto' }}>
      <img src={room1} alt="Room 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            <ImageButton src={goBackImg} alt="뒤돌기" onClick={handleGoToRoom2} />
          </div>
        )}
        
        {isLoggedIn && (
          <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
            <ImageButton src={button4Img} alt="4번방으로" onClick={handleGoToRoom4} />
          </div>
        )}
        
        {!isLoggedIn && (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {showDialogue && (
          <DialogueBox 
            text="날씨가 너무 덥다, 그리고 센터 출입증을 두고왔다 어떻게 해야하지??" 
            onClose={handleCloseDialogue}
            autoClose={true}
            autoCloseDelay={5000}
          />
        )}

        <CTFModal
          isOpen={showCTFModal}
          onClose={handleCTFClose}
          onSuccess={handleCTFSuccess}
          question="1+1은?"
          answer="2"
        />
      </div>
    </div>
  );
}
