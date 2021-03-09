import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { seashell } from '../../styles/variables/colors_tiles_v4';

const LEFT = 'left';
const RIGHT = 'right';
const MENU_WIDTH = 400;
const MENU_WIDTH_UNITS = 'px';

const propTypes = {
  isOpen: PropTypes.bool,
  position: PropTypes.oneOf([LEFT, RIGHT]),
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  render: PropTypes.func.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  widthUnits: PropTypes.string,
};

const defaultProps = {
  isOpen: true,
  position: LEFT,
  title: '',
  width: MENU_WIDTH,
  widthUnits: MENU_WIDTH_UNITS,
};

const Menu = props => {
  const {
    handleClose,
    isOpen,
    position,
    render,
    theme,
    title,
    width,
    widthUnits,
  } = props;
  const rootClasses = classnames({
    open: isOpen,
  });

  const isLeft = position === LEFT;

  const inlineStyle = {
    ...theme,
    left: isLeft ? (isOpen ? 0 : `${-width}${widthUnits}`) : 'auto',
    right: isLeft ? 'auto' : isOpen ? 0 : `${-width}${widthUnits}`,
    width: isOpen ? `${width}${widthUnits}` : 0,
  };

  return (
    <div className={`root ${rootClasses}`} style={inlineStyle}>
      <div className="menu-list">{render({ isOpen })}</div>

      <style jsx>
        {`
          .root {
            position: fixed;
            z-index: 9999;
            width: 400px;
            top: 60px;
            overflow-y: auto;
            min-height: 100vh;
            height: 100%;
            background: ${seashell};
            transition-property: left, right;
            transition-duration: 0.15s;
            transition-timing-function: ease-in-out;
            display: grid;
          }

          .menu-list {
            margin-bottom: 500px;
            padding-bottom: 60px;
          }
        `}
      </style>
    </div>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
