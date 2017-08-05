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
      <Link className={style.actionBtn} to="/road-trip/registration">Register</Link>
    </div>
  );
}

export default Hero;
