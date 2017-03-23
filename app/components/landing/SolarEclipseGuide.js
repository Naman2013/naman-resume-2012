import React from 'react';
import style from './SolarEclipseGuide.scss';

const sponsors = [
  '/assets/images/roadtrip-lander/sponsor-rmr.png',
  '/assets/images/roadtrip-lander/sponsor-redit.png',
  '/assets/images/roadtrip-lander/sponsor-stanley.png',
  '/assets/images/roadtrip-lander/sponsor-rmr.png',
  '/assets/images/roadtrip-lander/sponsor-redit.png',
  '/assets/images/roadtrip-lander/sponsor-stanley.png',
  '/assets/images/roadtrip-lander/sponsor-rmr.png',
  '/assets/images/roadtrip-lander/sponsor-redit.png',
];

function SolarEclipseGuide() {
  return (
    <div className={style.solarEclipseGuideWrapper}>
      <div className={style.container}>
        <div className={style.inner}>
          <div className={style.subHeader}>
            Also available from Slooh:
          </div>
          <div className={style.header}>
            Solar Eclipse Field Guide
          </div>
          <div className={style.description}>
            Cras quis nulla commodo, aliquam lectus sed, blandit augue. Craster ullamcorper bibendum bibendum. Duis tincidunt urna non pretiurta. Nam condimentum vitae ligula vel ornare. Phasellus at semper turpis tellus tortor. Etiam at condimentum nisl, vitae sagittis orci. Donec id dignissim nunc. Donec elit ante, eleifend a dolor et.
          </div>
          <button className={style.actionBtn}>Buy Now</button>
        </div>
      </div>
      <div className={style.sponsorsContainer}>
        <div className={style.sponsorsHeader}>
          Our Sponsors
        </div>
        <ul className={style.sponsors}>
          {sponsors.map((sponsor, i) => {
            return (
              <li key={`sponsor_${i}`} className={style.sponsor}>
                <img src={sponsor} alt="sponsor" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SolarEclipseGuide;
