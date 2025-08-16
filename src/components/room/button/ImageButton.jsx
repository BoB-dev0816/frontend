import React, { useState } from 'react';

const ImageButton = ({ src, alt, onClick, style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '12px',
        boxShadow: isHovered 
          ? '0 8px 16px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)' 
          : '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: isHovered 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.1)',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        backdropFilter: 'blur(4px)',
        ...style
      }}
    >
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: '60px',
          height: '60px',
          objectFit: 'contain',
          filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
          transition: 'filter 0.2s ease'
        }}
      />
    </button>
  );
};

export default ImageButton;