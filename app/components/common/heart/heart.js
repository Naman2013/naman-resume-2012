import React, { Component, PropTypes } from 'react';
import style from './heart.scss';

const Heart = ({ count, handleClick }) => (
  <button onClick={handleClick} className={style.heart}>
    <p className={style.count}>{count}</p>
  </button>
);

Heart.defaultProps = {
  count: '0',
  handleClick: (event => { console.warn( 'No handler provided for this instance of heart.' ) }),
};

export default Heart;
