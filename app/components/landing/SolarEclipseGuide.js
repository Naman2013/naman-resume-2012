import React from 'react';
import style from './SolarEclipseGuide.scss';

const sponsors = [
  'https://vega.slooh.com/assets/images/roadtrip-lander/sponsor-rmr.png',
  'https://vega.slooh.com/assets/images/roadtrip-lander/sponsor-redit.png',
  'https://vega.slooh.com/assets/images/roadtrip-lander/sponsor-stanley.png',
  'https://vega.slooh.com/logos/PSLogo_sm.png',
];

function SolarEclipseGuide() {
  return (
    <div className={style.solarEclipseGuideWrapper}>
      <div className={style.sponsorsContainer}>
        <div className={style.sponsorsHeader}>
          Our Partners
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
