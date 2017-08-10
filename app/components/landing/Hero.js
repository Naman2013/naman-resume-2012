import React from 'react';
import style from './Hero.scss';
import { Link } from 'react-router';

function Hero() {
  return (
    <div className={style.heroWrapper}>
      <div className={style.header}>
        <span>Transcontinental</span>
        <span>Eclipse</span>
        <span>Road Trip</span>
        <span className={style.sideLines}>Slooh Road Trips</span>
      </div>
      
    </div>
  );
}

export default Hero;
