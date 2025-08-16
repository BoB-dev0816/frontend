import React from 'react';

const NumberText = ({ number, x, y, color = 'text-black' }) => {
  return (
    <div 
  className={`absolute ${color} text-4xl font-extrabold select-none pointer-events-none z-10 drop-shadow-lg`}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        WebkitTextStroke: '1px #fff', // 테두리 효과 (흰색)
        textStroke: '1px #fff', // 일부 브라우저용 (흰색)
      }}
    >
      {number}
    </div>
  );
};

export default NumberText;