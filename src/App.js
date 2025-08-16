import React from 'react';
import Room1 from './components/room/room1/Room1';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">R</h1>
        <Room1></Room1>
      </div>
    </div>
  );
}

export default App;