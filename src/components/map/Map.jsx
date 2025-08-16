import React, { useState } from 'react';
import mapImage from './map.png';
import NumberText from './NumberText';
import { useRoom } from '../../contexts/RoomContext';

const Map = () => {
  const { currentRoom } = useRoom();
  const [isHovered, setIsHovered] = useState(false);
  
  const rooms = [
    { number: 1, x: 34.4, y: 35 },
    { number: 2, x: 34.4, y: 65.3 },
    { number: 3, x: 57.2, y: 50 },
    { number: 4, x: 17, y: 30 },
    { number: 5, x: 17, y: 75 },
    { number: 6, x: 65, y: 94 },
    { number: 7, x: 30, y: 10 },
    { number: 8, x: 50, y: 10 },
    { number: 9, x: 70, y: 10 },
    { number: 10, x: 95, y: 50 }
  ];

  return (
    <>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '2 / 1',
          backgroundImage: `url(${mapImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.85,
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      >
        {rooms.map(room => (
          <NumberText 
            key={room.number}
            number={room.number} 
            x={room.x} 
            y={room.y} 
            color={currentRoom === room.number ? 'text-yellow-400' : 'text-red-500'}
          />
        ))}
      </div>
      
      {isHovered && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            backgroundImage: `url(${mapImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            border: '3px solid #fff',
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            opacity: 0.95,
          }}
        >
          {rooms.map(room => (
            <NumberText 
              key={room.number}
              number={room.number} 
              x={room.x} 
              y={room.y} 
              color={currentRoom === room.number ? 'text-yellow-400' : 'text-red-500'}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Map;