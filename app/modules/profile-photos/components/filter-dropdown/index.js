// @flow

import React from 'react';
import { Button } from 'react-bootstrap';
import './index.scss';
import useOnClickOutside from 'use-onclickoutside';

type TFilterDropdown = {
  isOpen: Boolean,
  setOpen: Function,
  setClose: Function,
  onChange: Function,
};

export const FilterDropdown = (props: TFilterDropdown) => {
  const { isOpen, setOpen, setClose, onChange } = props;

  const ref = React.useRef(null);
  useOnClickOutside(ref, setClose);

  return (
    <div className="filter-dropdown-wrapper">
      <Button onClick={setOpen}>Options</Button>

      {isOpen && (
        <div className="filter-dropdown animated fadeIn faster" ref={ref}>
          <div className="filter-dropdown-header d-flex justify-content-between">
            <span>OPTIONS</span>
            <span
              className="icon-close close-btn"
              onClick={setClose}
              role="presentation"
            />
          </div>

          <div className="filter-dropdown-body">x</div>

          <div className="filter-dropdown-footer text-center">
            <Button className="mr-3">reset</Button>
            <Button>apply filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};
