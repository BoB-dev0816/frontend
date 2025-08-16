import React, { useState } from 'react';
import airImg from './air.png';

const AirConditioner = ({ style = {} }) => {
  const [temperature, setTemperature] = useState(22);

  const increaseTemp = () => {
    setTemperature(prev => Math.min(prev + 1, 30));
  };

  const decreaseTemp = () => {
    setTemperature(prev => Math.max(prev - 1, 16));
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20%',
      left: '20%',
      width: '35%',
      height: '50%',
      ...style
    }}>
      {/* 에어컨 이미지 */}
      <img 
        src={airImg} 
        alt="에어컨" 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '70%',
          height: '100%',
          objectFit: 'contain'
        }}
      />

      {/* 온도 조절 버튼들 */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        width: '15%',
        height: '30%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* 온도 올리기 버튼 */}
        <button
          onClick={increaseTemp}
          style={{
            flex: 1,
            backgroundColor: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          ▲
        </button>

        {/* 온도 내리기 버튼 */}
        <button
          onClick={decreaseTemp}
          style={{
            flex: 1,
            backgroundColor: '#4444ff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          ▼
        </button>
      </div>

      {/* 온도 표시 */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '35%',
        transform: 'translateX(-50%)',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '20px',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '4px 8px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        {temperature}°C
      </div>
    </div>
  );
};

export default AirConditioner;