import React from 'react';
import PropTypes from 'prop-types';
import Timestamp from '../../common/Timestamp';
import { pink, darkBlueGray, lightGray, white } from '../../../styles/variables/colors';

const propTypes = {
  upcomingTitle: PropTypes.string.isRequired,
  upcomingObjectIconURL: PropTypes.string.isRequired,
  upcomingStart: PropTypes.number.isRequired,
};

const Mission = ({ upcomingTitle, upcomingObjectIconURL, upcomingStart }) => (
  <div className="root">
    <div className="imageIcon">
      <img width="50" className="icon" alt="Mission target icon" src={upcomingObjectIconURL} />
    </div>
    <div className="missionDetails">
      <h4 className="title">{upcomingTitle}</h4>
      <h5 className="upcomingStart"><Timestamp timestampInSeconds={upcomingStart} /></h5>
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
        margin-right: 10px;
        background: ${darkBlueGray};
        min-width: 70px;
      }

      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      .missionDetails {
        padding: 10px 5px 10px 0;
      }

      .title {
        color: ${pink};
        text-transform: none;
      }

      .upcomingStart {
        color: ${white};
        font-size: 12px;
        font-weight: normal;
      }
    `}</style>
  </div>
);

Mission.propTypes = propTypes;

export default Mission;
