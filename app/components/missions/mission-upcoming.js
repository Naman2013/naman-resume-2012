import React from 'react';
import styles from './mission-sidebar.scss';

const MissionUpcoming = () => {
  return (
    <div className="widget-container mission-upcoming">
      <div className="widget-header">
        <img src="assets/images/graphics/peter.jpg" />
        <h2>Peter&rsquo;s Upcoming Mission</h2>
      </div>

      <div className="cardsubTitle">
        <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
        <h3>Andromeda Galaxy (M31)</h3>
      </div>

      <div className="upcoming-mission-date">
        <strong>Thursday, October 18th</strong><br />
        10:05pm EST  ·  7:05pm PST  ·  03:05 UTC
      </div>

      <a href="#" className="btn btn-primary">View Reservations</a>

    </div>
  )
}

export default MissionUpcoming;
