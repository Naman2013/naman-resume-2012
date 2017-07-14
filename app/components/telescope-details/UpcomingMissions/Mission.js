import React from 'react';
import PropTypes from 'prop-types';
import { pink, darkBlueGray, lightGray } from '../../../styles/variables/colors';

const propTypes = {
  upcomingTitle: PropTypes.string.isRequired,
  upcomingObjectIconURL: PropTypes.string.isRequired,
};

const Mission = ({ upcomingTitle, upcomingObjectIconURL }) => (
  <div className="root">
    <div className="imageIcon">
      <img width="50" className="icon" alt="Mission target icon" src={upcomingObjectIconURL} />
    </div>
    <div className="missionDetails">
      <h4 className="title">{upcomingTitle}</h4>
    </div>

    <style jsx>{`
      .root {
        display: flex;
        padding: 0;
        position: relative;
        border-bottom: 1px solid ${lightGray};
      }

      .imageIcon {
        position: relative;
        padding: 10px 0 0 10px;
        background: ${darkBlueGray};
        min-width: 70px;
      }

      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin: 0 auto;
      }

      .title {
        color: ${pink};
        text-transform: none;
        padding: 15px 5px 15px 10px;
      }
    `}</style>
  </div>
);

Mission.propTypes = propTypes;

export default Mission;
