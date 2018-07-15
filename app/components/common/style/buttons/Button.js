import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './Button.style';

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
    <style jsx>{styles}</style>
  </button>
);

Button.propTypes = {
  text: oneOfType([string, number]),
  icon: string,
  onClickEvent: func.isRequired,
};
Button.defaultProps = {};

export default Button;
