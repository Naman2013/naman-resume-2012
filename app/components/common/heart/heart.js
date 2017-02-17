import React, { Component, PropTypes } from 'react';
import style from './heart.scss';
import classnames from 'classnames';
/*

  light theme - light page background => dark heart
  dark theme - dark page background => light heart

*/

const Heart = ({ count, handleClick, theme }) => {
  return (
    <span
      onClick={handleClick}
      className={`${style.heart} ${theme}`}
    >
      <i className="fa fa-heart" />
      <span className={style.count}>{count}</span>
    </span>
  )
};

Heart.defaultProps = {
  count: '0',
  theme: 'light',
  handleClick: (event => { console.warn( 'No handler provided for this instance of heart.' ) }),
};

export default Heart;
