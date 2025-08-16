import React from 'react';
import './mobile.css';
import Room1 from './components/room/room1/Room1';
import Room2 from './components/room/room2/Room2';
import Room3 from './components/room/room3/Room3';
import Room4 from './components/room/room4/Room4';
import Room5 from './components/room/room5/Room5';
import Room6 from './components/room/room6/Room6';
import Room7 from './components/room/room7/Room7';
import Room8 from './components/room/room8/Room8';
import Room9 from './components/room/room9/Room9';
import Room10 from './components/room/room10/Room10';
import { AuthProvider } from './contexts/AuthContext';
import { RoomProvider, useRoom } from './contexts/RoomContext';

function AppContent() {
  const { currentRoom } = useRoom();
  
  const renderCurrentRoom = () => {
    switch(currentRoom) {
      case 1:
        return <Room1 />;
      case 2:
        return <Room2 />;
      case 3:
        return <Room3 />;
      case 4:
        return <Room4 />;
      case 5:
        return <Room5 />;
      case 6:
        return <Room6 />;
      case 7:
        return <Room7 />;
      case 8:
        return <Room8 />;
      case 9:
        return <Room9 />;
      case 10:
        return <Room10 />;
      default:
        return <Room1 />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        {renderCurrentRoom()}
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <AppContent />
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;