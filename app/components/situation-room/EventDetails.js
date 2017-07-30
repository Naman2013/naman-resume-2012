import React from 'react';
import s from './EventDetails.scss';

function EventDetails() {
  return (
    <div className={s.situationRoomEventDetailsRoot}>
      <div className={s.titleContainer}>
        <span className={s.icon}><img src="https://vega.slooh.com/assets/icons/flame.png" width="30" /></span>
        <h3 className={s.titleText}>The Sun</h3>
      </div>

      <div className={s.eventDescription}>
        <p>
          The Sun is the star at the center of the Solar System. It is a nearly
          perfect sphere of hot plasma, with internal convective motion that
          generates a magnetic field via a dynamo process.
        </p>

        <p>
          It is by far the most important source of energy for life on Earth.
        </p>
      </div>

      <ul className={s.statsContainer}>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
        <li className={s.stat}><b>RA (degrees):</b> 12.5057</li>
      </ul>
    </div>
  );
}

export default EventDetails;
