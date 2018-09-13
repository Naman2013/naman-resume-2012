import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

const propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  theme: PropTypes.object,
};

const defaultProps = {
  isActive: false,
};

const Button = ({
  children, handleClick, isActive, theme,
}) => (
  <div className="root">
    <button
      onClick={handleClick}
      className={classnames('action', { active: isActive })}
      style={theme}
    >
      { children }
    </button>

    <style jsx>{`
      .root {
        display: inline-block;
        font-family: ${primaryFont};
      }

      .action {
        border: none;
        cursor: pointer;
        color: ${astronaut};
        border-right: 1px solid ${shadows};
        text-align: center;
        background: none;
        width: 60px;
        height: 60px;

        transition-property: color background;
        transition-duration: 0.15s;
        transition-timing-function: ease-in-out;
      }

      .action.active {
        color: ${romance};
        background: ${astronaut};
      }

      .action:focus {
        outline: none;
      }
    `}
    </style>
  </div>
);

Button.defaultProps = defaultProps;
Button.propTypes = propTypes;

export default Button;
