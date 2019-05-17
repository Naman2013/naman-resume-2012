// @flow

import React from 'react';
import { Tooltip } from 'react-tippy';
import './styles.scss';

type TSelectedFilterItem = {
  label: string,
  onClick: Function,
};

export const SelectedFilterItem = (props: TSelectedFilterItem) => {
  const { label, onClick } = props;
  return (
    <Tooltip title="Click to remove">
      <span className="selected-filter" onClick={onClick} role="presentation">
        {label}

        <span className="icon-close" />
      </span>
    </Tooltip>
  );
};
