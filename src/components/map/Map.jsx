import React from 'react';
import mapImage from './map.png';
import NumberText from './NumberText';
import { useRoom } from '../../contexts/RoomContext';

const Map = () => {
  const { currentRoom } = useRoom();
  
  const rooms = [
    { number: 1, x: 34.4, y: 35 },
    { number: 2, x: 34.4, y: 65.3 },
    { number: 3, x: 57.2, y: 50 },
    { number: 4, x: 65, y: 94 },
    { number: 5, x: 50, y: 94 },
    { number: 6, x: 5, y: 94 },
    { number: 7, x: 30, y: 10 },
    { number: 8, x: 50, y: 10 },
    { number: 9, x: 70, y: 10 },
    { number: 10, x: 95, y: 50 }
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '2 / 1',
        backgroundImage: `url(${mapImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.85,
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
  );
};

export default Map;