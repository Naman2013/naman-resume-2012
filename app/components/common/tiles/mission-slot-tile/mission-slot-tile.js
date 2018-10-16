import React from 'react';
import style from './mission-slot-tile.style';

const MissionSlotTile = () => (
  <div className="mission-slot-root">
    <h4 className="object-title">The moon</h4>

    <div className="time">
      <p>20:30</p>
      <p>UTC</p>
    </div>

    <ul className="attendee-info">
      <li>Mon. Jan. 06</li>
      <li>17 attendees</li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

export { MissionSlotTile };
