import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { grayer } from '../../styles/variables/colors';

const LEFT = 'left';
const RIGHT = 'right';

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
    'left': isLeft ? 0 : 'auto',
    'right': isLeft ? 'auto' : 0,
  };

  return(
    <div className={rootClasses} style={inlineStyle}>

      <style jsx>{`
        position: absolute;
        width: 400px;
        height: 100vh;
        background: ${grayer};
      `}</style>
    </div>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
