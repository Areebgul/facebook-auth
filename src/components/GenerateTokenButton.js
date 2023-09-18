import React from 'react';

const GenerateTokenButton = ({ onGenerateToken }) => {
  return (
    <button onClick={onGenerateToken}>Generate Token</button>
  );
};

export default GenerateTokenButton;
