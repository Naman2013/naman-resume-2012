import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.style';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const Button = ({
  isActive,
  text,
  type,
  renderIcon,
  icon, // remove prop when refactoring for icon library
  onClickEvent,
  theme = {},
}) => (
  <button
    type={type}
    className={classnames('button-container', {
      circular: (icon && !text) || (renderIcon && !text),
      active: isActive,
    })}
    style={theme}
    onClick={onClickEvent}
  >
    {
      text &&
        <span className={classnames('text', {
          'pad-right': text && icon,
        })} dangerouslySetInnerHTML={{ __html: text }} />
    }

    {icon && <img alt="" className="icon" src={icon} />}

    {renderIcon && renderIcon()}

    <style jsx>{styles}</style>
  </button>
);

Button.propTypes = {
  isActive: bool,
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func.isRequired,
  renderIcon: func,
  type: string,
};
Button.defaultProps = {
  type: 'text',
  isActive: false,
  icon: null,
  text: null,
  renderIcon: null,
};

export default Button;
