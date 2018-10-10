import React from 'react';
import PropTypes from 'prop-types';
import starShape from 'atoms/icons/star-shape.svg';
import style from './scheduled-by-tile.style';

const ScheduledByTile = () => (
  <div>
    <h3 className="title">Mission scheduled by:</h3>
    <img className="profile-photo" alt="scheduled mission member" src="" />
    <h4 className="profile-name">Thomas Johnson</h4>
    <ul>
      <li>White dwarf</li>
      <li><img alt="" src={starShape} />129k</li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

export { ScheduledByTile };
