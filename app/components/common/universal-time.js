import React from 'react';

const UniversalTime = () => {
  return (
    <li className="col-md-3 push-right universal-time">
      <span className="light-gray">Universal Time: </span><span className="time"><b>01:26:42</b></span>
      <br />
      <a className="time-action pink" href="">What is UTC?</a>
    </li>
  )
};

export default UniversalTime;
