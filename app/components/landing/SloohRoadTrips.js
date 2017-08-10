import React from 'react';
import { Link } from 'react-router';
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
            For years we've been on expeditions to Kenya, Nigeria, the
            Faroe Islands, Iceland, Indonesia, Australia, Chile and Alaska with
            our mobile observatory to witness the most compelling moments in
            space. Now we're taking you with us. Introducing Slooh Road Trips.
          </div>
          <div style={{ marginTop: '20px' }}>
            <Link
              style={{ color: '#fff' }}
              to="/shows/event-details/393"
              className={style.actionBtn}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SloohRoadTrips;
