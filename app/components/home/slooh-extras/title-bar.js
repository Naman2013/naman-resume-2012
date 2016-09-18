import React from 'react';
import style from './title-bar.scss';

const TitleBar = (props) => (
  <h3 className="slooh-extras-title-bar">{props.title}</h3>
);

export default TitleBar;
