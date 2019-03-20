// @flow
import React from 'react';
import './index.scss';

type TIcon = {
  i: string,
};

const Icon = (props: TIcon) => {
  const { i } = props;
  return <i className={`icon fa fa-${i}`} />;
};

export default Icon;
