// @flow
import React from 'react';
import './index.scss';

type Props = {
  i: string,
};

const Icon = ({ i }: Props) => <i className={`icon fa fa-${i}`} />;

export default Icon;
