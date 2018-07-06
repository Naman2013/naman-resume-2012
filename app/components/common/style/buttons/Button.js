import React from 'react';
import PropTypes from 'prop-types';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const ButtonWithIcon = ({
  text,
  icon,
  onClickEvent,
}) => (
  <button
    className="button-container"
    onClick={onClickEvent}
  >
    {text ? <span className="text" dangerouslySetInnerHTML={{ __html: text }} /> : null}
    {icon ? <img className="text" src={icon} /> : null}
    <style jsx>
      {`
        .text {
          vertical-align: middle;
          font-size: 11px;
          margin: 0 auto;
        }
        .button-container {
          background-color: transparent;
          display: block;
          border: 1px dashed ${astronaut};
          border-radius: 100px;
          width: 110px;
          margin: 15px 0;
          font-size: 11px;
          font-weight: bold;
          padding: 5px 0;
          text-transform: uppercase;
          width: 40px;
          height: 40px;
        }
      `}
    </style>
  </button>
);

ButtonWithIcon.propTypes = {
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func.isRequired,
};
ButtonWithIcon.defaultProps = {};

export default ButtonWithIcon;
