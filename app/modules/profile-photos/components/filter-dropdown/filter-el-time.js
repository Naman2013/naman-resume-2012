// @flow

import cx from 'classnames';
import React from 'react';
import './filter-el-time.scss';

type TFilterElTime = {
  title: string,
  active?: Boolean,
  onClick: Function,
};

export const FilterElTime = (props: TFilterElTime) => {
  const { title, active, onClick } = props;

  return (
    <div
      className={cx('filter-el-time', { active })}
      onClick={onClick}
      role="presentation"
    >
      <div className="h4-custom filter-el-time-title">{title}</div>
    </div>
  );
};
