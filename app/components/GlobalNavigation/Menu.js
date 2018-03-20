import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuTitleBar from './Menus/partials/MenuTitleBar';
import { grayer } from '../../styles/variables/colors';

const LEFT = 'left';
const RIGHT = 'right';
const MENU_WIDTH = 400;

const propTypes = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf([LEFT, RIGHT]),
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  render: PropTypes.func.isRequired,
};

const defaultProps = {
  isOpen: true,
  position: LEFT,
  title: '',
};

const Menu = ({ isOpen, position, handleClose, title, render }) => {
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

      {
        title &&
          <MenuTitleBar
            title={title}
            handleCloseClick={handleClose}
          />
      }

      { render() }

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
