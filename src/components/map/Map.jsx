import React from 'react';
import mapImage from './map.png';
import NumberText from './NumberText';

const Map = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '873px',
        height: '443px',
        backgroundImage: `url(${mapImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.85,
      }}
    >
      <NumberText number={1} x={34.4} y={35} color='text-red-500'/>
      <NumberText number={2} x={34.4} y={65.3} color='text-red-500'/>
      <NumberText number={3} x={57.2} y={50} color='text-red-500'/>
      <NumberText number={4} x={65} y={94} color='text-red-500'/>
      <NumberText number={5} x={50} y={94} color='text-red-500'/>
      <NumberText number={6} x={5} y={94} color='text-red-500'/>
      <NumberText number={7} x={30} y={10} color='text-red-500'/>
      <NumberText number={8} x={50} y={10} color='text-red-500'/>
      <NumberText number={9} x={70} y={10} color='text-red-500'/>
      <NumberText number={10} x={95} y={50} color='text-red-500'/>
    </div>
  );
};

export default Map;