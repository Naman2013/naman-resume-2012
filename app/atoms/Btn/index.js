import React from 'react';
import classNames from 'classnames';
import './index.scss';

const Btn = ({ type = 'button', children, onClick, mod }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames('i-btn', mod && `i-btn-${mod}`)}
    >
      {children}
    </button>
  );
};

export default Btn;
