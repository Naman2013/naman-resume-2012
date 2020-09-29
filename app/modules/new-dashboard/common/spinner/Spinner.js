import React from 'react';
import cx from 'classnames';
import './styles.scss';

export default props => {
  const { transparent, text, style } = props;
  return (
    <div
      className={cx('spinner-wrapper-new animated fadeIn faster', { transparent })}
    >
      <div className={cx("spinner-container", {'right-align' : style})}>
        <div className="spinner" />
        <div className="spinner-text">{text}</div>
      </div>
    </div>
  );
};
