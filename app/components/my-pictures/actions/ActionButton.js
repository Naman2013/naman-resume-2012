import React from 'react';
import PropTypes from 'prop-types';
import { white, black, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';

// TODO allow for making the description dark or light...

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  fontAwesomeIcon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const ActionButton = ({ handleClick, fontAwesomeIcon, description }) => (
  <div>
    <button className="action" onClick={handleClick}>
      <span className={`fa ${fontAwesomeIcon}`} />
      <div className="action-description">{description}</div>
    </button>

    <style jsx>{`
      .light .action-description {
        color: ${white};
      }

      .dark .action-description {
        color: ${black};
      }

      .action {
        transition: none !important;
        position: relative;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: inline-block;
        border: none;
        background: ${turqoise};
        color: ${white};
        margin-right: 5px;
      }

      .action:hover {
        background: ${lightTurqoise};
        color: ${darkBlueGray};
      }

      .action:focus {
        outline: none;
      }

      .action .action-description {
        position: absolute;
        text-align: center;
        visibility: hidden;
      }

      .action:hover .action-description {
        text-align: center;
        visibility: visible;
        margin-top: 8px;
        margin-left: -75%;
        width: 100px;
        white-space: nowrap;
      }
    `}</style>
  </div>
);

ActionButton.propTypes = propTypes;

export default ActionButton;
