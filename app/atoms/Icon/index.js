import React from 'react';
import './index.scss';

const Icon = ({ i, onClick }) => {
  return (
    <i className={`icon fa fa-${i}`} onClick={onClick} />
  );
};

export default Icon;
