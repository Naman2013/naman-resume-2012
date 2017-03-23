import React from 'react';
import style from './SloohRoadTrips.scss';

function SloohRoadTrips() {
  return (
    <div className={style.sloohRoadTripsWrapper}>
      <div className={style.container}>
        <div className={style.inner}>
          <div className={style.header}>
            About Slooh
            <br />
            Road Trips
          </div>
          <div className={style.description}>
            Nam dapibus nisl vitae elit fringilla rutrum. Aenean sollicitudin, erat a elementum rutrum, neque sem pretium metus, quis mollis nisl nunc et massa. Vestibulum sed metus in lorem tristique ullamcorper id vitae erat. Nulla mollis sapien sollicitudin lacinia lacinia.
          </div>
          <div className={style.actionBtn}>
            Learn More
          </div>
        </div>
      </div>
    </div>
  );
}

export default SloohRoadTrips;
