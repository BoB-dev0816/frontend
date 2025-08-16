import React from 'react';

const Button = ({ children, onClick, style = {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;