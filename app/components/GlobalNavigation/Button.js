import { SCREEN_MEDIUM } from 'app/styles/variables/breakpoints';
import {
  astronaut,
  romance,
  shadows,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  children: PropTypes.node.isRequired,
  handleClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  theme: PropTypes.object,
  mod: PropTypes.string,
};

const defaultProps = {
  isActive: false,
};

const Button = ({ children, handleClick, isActive, theme, mod }) => (
  <div className="root">
    <button
      onClick={handleClick}
      className={classnames(mod ? `action ${mod}` : 'action', {
        active: isActive,
      })}
      style={theme}
    >
      {children}
    </button>

    <style jsx>
      {`
        .root {
          display: inline-block;
          font-family: ${primaryFont};
        }

        .action {
          display: block;
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

        @media screen and (max-width: ${SCREEN_MEDIUM}px) {
          .action {
            width: 40px;
          }
        }

        .action.no-border {
          border: none;
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
