// @flow

import { FilterElImg } from 'app/modules/profile-photos/components/filter-dropdown/filter-el-img';
import React from 'react';
import { Button } from 'react-bootstrap';
import './index.scss';
import useOnClickOutside from 'use-onclickoutside';
import { Tooltip } from 'react-tippy';

type TFilterDropdown = {
  isOpen: Boolean,
  setOpen: Function,
  onChange: Function,
  onApply: Function,
  telescopeList: any,
  objectTypeList: any,
};

export const FilterDropdown = (props: TFilterDropdown) => {
  const {
    isOpen,
    setOpen,
    onChange,
    selectedFilters,
    objectTypeList,
    telescopeList,
    onApply,
  } = props;

  const { filterType: activeFilterType } = selectedFilters;

  const open = () => setOpen(true);
  const close = () => setOpen(false);

  const ref = React.useRef(null);
  useOnClickOutside(ref, close);

  const isTelescopeSelected = (observatoryId, pierNumber) => {
    const {
      pierNumber: activePierNumber,
      observatoryId: activeObservatoryId,
    } = selectedFilters;
    return (
      activePierNumber === pierNumber && activeObservatoryId === observatoryId
    );
  };

  const handleReset = () => {
    // reset all filters
    onChange({
      pierNumber: null,
      observatoryId: null,
      filterType: null,
    });
    onApply();
    close();
  };

  return (
    <div className="filter-dropdown-wrapper">
      <Button onClick={open}>Options</Button>

      {isOpen && (
        <div className="filter-dropdown animated fadeIn faster" ref={ref}>
          <div className="filter-dropdown-header d-flex justify-content-between">
            <span>OPTIONS</span>
            <Tooltip title="Close">
              <span
                className="icon-close close-btn"
                onClick={close}
                role="presentation"
              />
            </Tooltip>
          </div>

          <div className="filter-dropdown-body">
            <h4 className="h4-custom">BY OBJECT TYPE</h4>

            <div className="grid-elements-img">
              {objectTypeList.map(ot => (
                <FilterElImg
                  imgUrl={ot.objectTypeIconURL}
                  key={ot.objectTypeIndex}
                  title={ot.objectTypeDisplayName}
                  active={ot.objectTypeFilter === activeFilterType}
                  onClick={() => onChange({ filterType: ot.objectTypeFilter })}
                />
              ))}
            </div>

            <hr />

            <h4 className="h4-custom">BY TELESCOPE</h4>

            <div className="grid-elements-img">
              {telescopeList.map(telescope => (
                <FilterElImg
                  imgUrl={telescope.iconUrl}
                  key={telescope.observatoryId + telescope.pierNumber}
                  title={telescope.name}
                  active={isTelescopeSelected(
                    telescope.observatoryId,
                    telescope.pierNumber
                  )}
                  onClick={() =>
                    onChange({
                      pierNumber: telescope.pierNumber,
                      observatoryId: telescope.observatoryId,
                    })
                  }
                />
              ))}
            </div>

            <hr />
          </div>

          <div className="filter-dropdown-footer text-center">
            <Button className="mr-3" onClick={handleReset}>
              reset
            </Button>
            <Button
              onClick={() => {
                onApply();
                close();
              }}
            >
              apply filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
