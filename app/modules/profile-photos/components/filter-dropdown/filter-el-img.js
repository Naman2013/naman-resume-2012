// @flow

import React from 'react';
import './filter-el-img.scss';

type TFilterElImg = {
  imgUrl: string,
  title: string,
  active: Boolean,
};

export const FilterElImg = (props: TFilterElImg) => {
  const { imgUrl, title, active } = props;
  return (
    <div className="filter-el-img">
      <img src={imgUrl} alt="" />
      <div className="filter-el-img-title">{title}</div>
    </div>
  );
};
