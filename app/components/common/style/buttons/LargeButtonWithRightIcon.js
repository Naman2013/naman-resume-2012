import React from 'react';
import PropTypes from 'prop-types';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LargeButtonWithRightIcon = ({ text, onClickEvent, icon }) => (
  <button
    className="button-container"
    onClick={onClickEvent}
  >
    <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
    <img
      className="icon"
      src={icon}
    />
    <style jsx>
      {`
        .text {
          vertical-align: middle;
          font-size: 11px;
          margin: 0 10px;
        }
        .button-container {
          position: relative;
          display: block;
          border: 1px dashed ${astronaut};
          border-radius: 100px;
          width: 140px;
          height: 40px;
          margin: 15px 0;
          font-size: 11px;
          font-weight: bold;
          padding: 10px 0;
          text-align: left;
          text-transform: uppercase;
          background-color: transparent;
        }

        .icon {
          position: absolute;
          right: 10px;
          top: 14px;
        }
      `}
    </style>
  </button>
);

LargeButtonWithRightIcon.propTypes = {
  icon: string.isRequired,
  text: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
};
LargeButtonWithRightIcon.defaultProps = {};

export default LargeButtonWithRightIcon;
