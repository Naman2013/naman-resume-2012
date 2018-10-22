import React from 'react';

const NoMarginContainer = ({ children }) => (
  <div style={{ margin: '-10px' }}>
    {children}
  </div>
);

export default NoMarginContainer;
