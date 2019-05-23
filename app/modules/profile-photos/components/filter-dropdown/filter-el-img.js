// @flow

import cx from 'classnames';
import React from 'react';
import './filter-el-img.scss';

type TFilterElImg = {
  imgUrl: string,
  title: string,
  active: Boolean,
  onClick: Function,
};

export const FilterElImg = (props: TFilterElImg) => {
  const { imgUrl, title, active, onClick } = props;

  return (
    <div
      className={cx('filter-el-img', { active })}
      onClick={onClick}
      role="presentation"
    >
      <img src={imgUrl} alt="" />
      <div className="filter-el-img-title">{title}</div>
    </div>
  );
};
