import React from 'react';
import PropTypes from 'prop-types';
import { pink } from '../../../styles/variables/colors';
import { backgroundImageCoverMap } from '../../../styles/mixins/utilities';

function backgroundImage(imageURL) {
  return {
    ...backgroundImageCoverMap,
    backgroundImage: `url(${imageURL})`,
  };
}

const propTypes = {
  upcomingTitle: PropTypes.string.isRequired,
  upcomingObjectIconURL: PropTypes.string.isRequired,
};

const Mission = ({ upcomingTitle, upcomingObjectIconURL }) => (
  <div className="root">
    <div className="imageIcon" style={backgroundImage(upcomingObjectIconURL)} />
    <div className="missionDetails">
      <h4 className="title">{upcomingTitle}</h4>
    </div>

    <style jsx>{`
      .root {
        display: flex;
        align-items: stretch;
        border: 1px solid;
        padding: 0;
      }

      .imageIcon {
        width: 80px;
      }

      .title {
        color: ${pink};
        text-transform: none;
        padding: 20px 5px 20px 10px;
      }
    `}</style>
  </div>
);

Mission.propTypes = propTypes;

export default Mission;
