import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import omit from 'lodash/omit';
import styles from './Button.style';

const { bool, func, number, oneOfType, string, object } = PropTypes;

const Button = props => {
  const {
    isActive,
    text,
    type,
    renderIcon,
    icon, // remove prop when refactoring for icon library
    onClickEvent,
    theme = {},
    withIntl,
    disabled,
    children,
    mod,
  } = props;
  const buttonProps = omit(props, [
    'isActive',
    'renderIcon',
    'onClickEvent',
    'icon',
    'theme',
  ]);
  return (
    <button
      {...buttonProps}
      type={type}
      className={classnames(
        mod ? `button-container ${mod}` : 'button-container',
        {
          circular: (icon && !text) || (renderIcon && !text),
          active: isActive,
        }
      )}
      style={theme}
      onClick={onClickEvent}
      disabled={disabled}
    >
      {text &&
        (withIntl ? (
          <span
            style={{ color: theme.color }}
            className={classnames('text', {
              'pad-right': text && icon,
            })}
          >
            {text}
          </span>
        ) : (
          <span
            style={{ color: theme.color }}
            className={classnames('text', {
              'pad-right': text && icon,
            })}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ))}

      {icon && <img alt="" className="button-icon" src={icon} />}

      {renderIcon && renderIcon()}
      {children}
      <style jsx>{styles}</style>
    </button>
  );
};

Button.propTypes = {
  isActive: bool,
  text: oneOfType([string, number, object]),
  icon: string,
  onClickEvent: func.isRequired,
  renderIcon: func,
  type: string,
  withIntl: bool,
  disabled: bool,
};
Button.defaultProps = {
  type: 'text',
  isActive: false,
  icon: null,
  text: null,
  renderIcon: null,
  withIntl: false,
  disabled: false,
};

export default Button;
