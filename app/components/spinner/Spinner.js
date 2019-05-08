import React from 'react';
import cx from 'classnames';
import './styles.scss';

export default props => {
  const { transparent, text } = props;
  return (
    <div
      className={cx('spinner-wrapper animated fadeIn faster', { transparent })}
    >
      <div className="spinner-container">
        <div className="spinner" />
        <div className="spinner-text">{text}</div>
      </div>
    </div>
  );
};
