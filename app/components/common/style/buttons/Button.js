import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const Button = ({
  text,
  icon,
  onClickEvent,
}) => (
  <button
    className={classnames('button-container', {
      circular: icon && !text,
    })}

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
          height: 40px;
          width: 140px;
        }

        .circular {
          width: 40px;
          height: 40px;
        }
      `}
    </style>
  </button>
);

Button.propTypes = {
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func.isRequired,
};
Button.defaultProps = {};

export default Button;
