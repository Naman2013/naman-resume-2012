import React from 'react';
import PropTypes from 'prop-types';

function backgroundImage(imageURL) {
  return {
    backgroundImage: `url(${imageURL})`,
  };
}

const propTypes = {
  upcomingTitle: PropTypes.string.isRequired,
  upcomingObjectIconURL: PropTypes.string.isRequired,
};

const Mission = ({ upcomingTitle, upcomingObjectIconURL }) => (
  <div>
    <div className="imageIcon" style={backgroundImage(upcomingObjectIconURL)} />
    <div className="missionDetails">
      <h4 className="title">{upcomingTitle}</h4>
    </div>
  </div>
);


Mission.propTypes = propTypes;

export default Mission;
