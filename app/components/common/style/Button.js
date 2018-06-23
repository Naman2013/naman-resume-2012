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
  text,
  onClickEvent,
}) => (
  <button
    className="button-container"
    onClick={onClickEvent}
  >
    <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
    <style jsx>
      {`
        .text {
          vertical-align: middle;
          font-size: 13px;
          margin: 0 auto;
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
  text: oneOfType([string, number]).isRequired,
  icon: string.isRequired,
  onClickEvent: func.isRequired,
};
ButtonWithIcon.defaultProps = {};

export default ButtonWithIcon;
