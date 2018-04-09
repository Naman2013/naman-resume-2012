import React from 'react';
import PropTypes from 'prop-types';
import { white, black, turqoise, lightTurqoise, darkBlueGray } from '../../../styles/variables/colors';

// TODO allow for making the description dark or light...

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  fontAwesomeIcon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
};

const defaultProps = {
  theme: 'light',
};

const ActionButton = ({
  handleClick,
  fontAwesomeIcon,
  description,
  theme,
}) => (
  <div>
    <button className="action" onClick={handleClick}>
      <span className={`fa ${fontAwesomeIcon}`} />
      <div className={`action-description ${theme}`}>{description}</div>
    </button>

    <style jsx>{`
      .action-description.light {
        color: ${white};
      }

      .action-description.dark {
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

      .action-description {
        position: absolute;
        left: -33px;
        top: 35px;
        text-align: center;
        visibility: hidden;
        width: 100px;
        display: block;
      }

      .action:hover .action-description {
        visibility: visible;
      }
    `}</style>
  </div>
);

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;

export default ActionButton;
