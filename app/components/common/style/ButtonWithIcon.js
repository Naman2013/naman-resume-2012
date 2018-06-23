import React from 'react';
import PropTypes from 'prop-types';
import { darkGray } from 'styles/variables/colors';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const ButtonWithIcon = ({
  count,
  icon,
  onClickEvent,
}) => (
  <button
    className="button-container"
    onClick={onClickEvent}
  >
    <img
      src={icon}
    />
    <span className="count" dangerouslySetInnerHTML={{ __html: count }} />
    <style jsx>
      {`
        .count {
          vertical-align: middle;
          font-size: 13px;
          margin: 0 5px;
        }
        .button-container {
          display: block;
          border: 1px dotted ${darkGray};
          border-radius: 100px;
          width: 110px;
          margin: 15px 0;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 0;
          text-transform: uppercase;
          width: 50px;
        }
      `}
    </style>
  </button>
);

ButtonWithIcon.propTypes = {
  count: oneOfType([string, number]).isRequired,
  icon: string.isRequired,
  onClickEvent: func.isRequired,
};
ButtonWithIcon.defaultProps = {};

export default ButtonWithIcon;
