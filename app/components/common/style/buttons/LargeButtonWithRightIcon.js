import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './LargeButtonWithRightIcon.style';

const {
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const LargeButtonWithRightIcon = ({ text, onClickEvent, icon, renderIcon }) => (
  <button
    className={classnames('button-container', {
      circular: icon && !text,
    })}
    onClick={onClickEvent}
  >
    <span className="text" dangerouslySetInnerHTML={{ __html: text }} />
    {icon ? <img
      className="icon"
      src={icon}
    /> : null}
    {renderIcon ? renderIcon() : null}
    <style jsx>{styles}</style>
  </button>
);

LargeButtonWithRightIcon.propTypes = {
  icon: string,
  text: oneOfType([string, number]).isRequired,
  onClickEvent: func.isRequired,
  renderIcon: func,
};
LargeButtonWithRightIcon.defaultProps = {
  icon: null,
  renderIcon: null,
};

export default LargeButtonWithRightIcon;
