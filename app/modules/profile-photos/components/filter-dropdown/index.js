// @flow

import { FilterElImg } from 'app/modules/profile-photos/components/filter-dropdown/filter-el-img';
import React from 'react';
import { Button } from 'react-bootstrap';
import './index.scss';
import useOnClickOutside from 'use-onclickoutside';

type TFilterDropdown = {
  isOpen: Boolean,
  setOpen: Function,
  onChange: Function,
};

export const FilterDropdown = (props: TFilterDropdown) => {
  const { isOpen, setOpen, onChange, filters, objectTypeList } = props;
  console.log(objectTypeList);

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  return (
    <div className="filter-dropdown-wrapper">
      <Button onClick={open}>Options</Button>

      {isOpen && (
        <div className="filter-dropdown animated fadeIn faster" ref={ref}>
          <div className="filter-dropdown-header d-flex justify-content-between">
            <span>OPTIONS</span>
            <span
              className="icon-close close-btn"
              onClick={close}
              role="presentation"
            />
          </div>

          <div className="filter-dropdown-body">
            <h4 className="h4-custom">BY OBJECT TYPE</h4>

            <div className="grid-elements-img">
              {objectTypeList.map(ot => (
                <FilterElImg
                  imgUrl={ot.objectTypeIconURL}
                  key={ot.objectTypeIndex}
                  title={ot.objectTypeDisplayName}
                  active={false}
                />
              ))}
            </div>

            <hr />
          </div>

          <div className="filter-dropdown-footer text-center">
            <Button className="mr-3">reset</Button>
            <Button>apply filters</Button>
          </div>
        </div>
      )}
    </div>
  );
};
