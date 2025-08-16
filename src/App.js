import React from 'react';
import Room1 from './components/room/room1/Room1';
import { AuthProvider } from './contexts/AuthContext';
import { RoomProvider } from './contexts/RoomContext';

function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Room1></Room1>
          </div>
        </div>
      </RoomProvider>
    </AuthProvider>
  );
}

export default App;