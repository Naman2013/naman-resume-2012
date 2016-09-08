import React from 'react';
import styles from './common.scss';

const UniversalTime = (props) => {

  let className = `${styles.universalTime} ${props.extraClass || ''}`;
  return (
    <div className={className}>
      <span className="light-gray">Universal Time: </span>
      <span className="time"><b>01:26:42</b></span>
      <br />
      <a className="time-action" href="#">What is UTC?</a>
    </div>
  )
};

export default UniversalTime;
