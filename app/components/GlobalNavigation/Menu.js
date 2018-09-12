import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import MenuTitleBar from './Menus/partials/MenuTitleBar';
import { seashell } from '../../styles/variables/colors_tiles_v4';

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

const Menu = ({
  isOpen, position, handleClose, title, render,
}) => {
  const rootClasses = classnames({
    open: isOpen,
  });

  const isLeft = (position === LEFT);

  const inlineStyle = {
    left: isLeft ? (isOpen) ? 0 : `${-MENU_WIDTH}px` : 'auto',
    right: isLeft ? 'auto' : (isOpen) ? 0 : `${-MENU_WIDTH}px`,
  };

  return (
    <div className={`root ${rootClasses}`} style={inlineStyle}>

      {
        title &&
          <MenuTitleBar
            title={title}
            handleCloseClick={handleClose}
          />
      }

      <div className="menu-list">{ render({ isOpen }) }</div>

      <style jsx>{`
        .root {
          position: fixed;
          z-index: 9999;
          width: 400px;
          top: 0;
          overflow-y: auto;
          min-height: 100vh;
          height: 100%;
          background: ${seashell};
          transition-property: left, right;
          transition-duration: 0.15s;
          transition-timing-function: ease-in-out;
        }

        .menu-list {
          padding-top: 50px;
        }
      `}
      </style>
    </div>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
