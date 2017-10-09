import React from 'react';

function generateStyle(top, right, bottom, left) {
  return {
    margin: top, right, bottom, left,
  };
}

const Margin = ({ top, right, bottom, left, children }) => (
  <div style={generateStyle(top, right, bottom, left)}>
    { children }
  </div>
);
