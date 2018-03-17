import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { grayer } from '../../styles/variables/colors';

const LEFT = 'left';
const RIGHT = 'right';
const MENU_WIDTH = 400;

const propTypes = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf([LEFT, RIGHT]),
};

const defaultProps = {
  isOpen: true,
  position: LEFT,
};

const Menu = ({ isOpen, position }) => {
  const rootClasses = classnames('root', {
    'open': isOpen,
  });

  const isLeft = (position === LEFT);

  const inlineStyle = {
    'left': isLeft ? (isOpen) ? 0 : `${-MENU_WIDTH}px` : 'auto',
    'right': isLeft ? 'auto' : (isOpen) ? 0 : `${-MENU_WIDTH}px`,
  };

  return(
    <div className={rootClasses} style={inlineStyle}>

      <style jsx>{`
        position: absolute;
        width: 400px;
        height: 100vh;
        background: ${grayer};

        transition-property: left right;
        transition-duration: 0.15s;
        transition-timing-function: ease-in-out;
      `}</style>
    </div>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
