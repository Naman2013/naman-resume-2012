import React from 'react';
import PropTypes from 'prop-types';
import starShape from 'atoms/icons/star-shape.svg';
import defaultProfileIcon from 'atoms/icons/default-profile-icon.svg';
import style from './scheduled-by-tile.style';

const ScheduledByTile = ({ scheduledBy, targetName }) => (
  <div className="scheduled-by-tile-root">
    <h3 className="title">Mission scheduled by:</h3>
    <img className="profile-photo" alt="scheduled mission member" src={defaultProfileIcon} />
    <h4 className="profile-name">{scheduledBy}</h4>
    <ul className="list-attributes">
      <li>{targetName}</li>
      <li><img alt="" src={starShape} />129k</li>
    </ul>
    <style jsx>{style}</style>
  </div>
);

ScheduledByTile.propTypes = {
  scheduledBy: PropTypes.string.isRequired,
  targetName: PropTypes.string.isRequired,
};

export { ScheduledByTile };
