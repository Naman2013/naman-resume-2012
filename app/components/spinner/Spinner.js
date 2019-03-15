import React from 'react';
import './styles.scss';

export default props => (
  <div className="spinner-wrapper animated fadeIn faster">
    <div className="spinner-container">
      <div className="spinner" />
      <div className="spinner-text">{props.text}</div>
    </div>
  </div>
);
