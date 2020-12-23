// @flow

import FilterMenuTags from 'app/components/my-pictures/FilterMenuTags';
import { Datepicker } from 'app/modules/profile-photos/components/filter-dropdown/datepicker';
import { FilterElImg } from 'app/modules/profile-photos/components/filter-dropdown/filter-el-img';
import { FilterElTime } from 'app/modules/profile-photos/components/filter-dropdown/filter-el-time';
import React, { memo } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import './index.scss';
import { Button as  NewButton} from '../../../new-dashboard/components/button';

type TFilterDropdown = {
  isOpen: Boolean,
  setOpen: Function,
  onChange: Function,
  onApply: Function,
  telescopeList: any,
  objectTypeList: any,
  timeList: any,
};

export const FilterDropdown = memo((props: TFilterDropdown) => {
  const {
    isOpen,
    setOpen,
    onChange,
    selectedFilters,
    objectTypeList,
    telescopeList,
    onApply,
    timeList = [],
    // tags
    setSelectedTagsTabIndex,
    myPicturesFilters,
    newButton,
  } = props;

  const {
    filterType: activeFilterType,
    timeFilter: activeTimeFilter,
    dateFilter: activeDateFilter,
  } = selectedFilters;

  const resetFilters = () => {
    onChange({
      pierNumber: null,
      observatoryId: null,
      filterType: null,
      timeFilter: null,
      dateFilter: null,
      missionSystemTags: [],
      missionUserTags: [],
      pictureUserTags: [],
      astroObjectIds: [],
      astroObjectName: null,
    });
  };

  const open = () => setOpen(true);
  const close = () => {
    resetFilters();
    setOpen(false);
  };

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
    resetFilters();
    onApply();
    close();
  };

  return (
    <div className={"filter-dropdown-wrapper" + newButton ? "right-align" : "" }>
      {newButton ? 
        <NewButton
          type={"button"}
          onClickEvent={open} 
          text={"Sort & Filter"}                                             
          style={"button-border"}
          icon={null}
        />
        // <h5 className="sort-filter" onClick={open}>{"Sort & Filter"}</h5> 
        :
        <Button onClick={open}>Options</Button>
      }
      
      
      <Modal
        show={isOpen}
        onHide={close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="filter-modal"
      >
        <div className="filter-dropdown animated fadeIn faster">
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

            <h4 className="h4-custom">BY TIME</h4>

            <div className="grid-elements-time">
              {timeList.map(time => (
                <FilterElTime
                  key={time.value}
                  title={time.name}
                  onClick={() =>
                    onChange({
                      timeFilter: time.value,
                    })
                  }
                  active={time.value === activeTimeFilter}
                />
              ))}
            </div>

            <div className="grid-elements-time mt-5">
              <Datepicker
                className="filter-custom-date"
                value={activeDateFilter}
                onChange={dateFilter => onChange({ dateFilter })}
                placeholder="SET DATE"
                outputFormat="YYYY-MM-DD"
              />
            </div>

            <hr />

            <h4 className="h4-custom">BY TAGS</h4>

            <FilterMenuTags
              setSelectedTagsTabIndex={setSelectedTagsTabIndex}
              selectedTagsTabIndex={myPicturesFilters.selectedTagsTabIndex}
              missionSystemTagsCount={myPicturesFilters.missionSystemTagsCount}
              missionUserTagsCount={myPicturesFilters.missionUserTagsCount}
              pictureUserTagsCount={myPicturesFilters.pictureUserTagsCount}
              selectedFilters={selectedFilters}
              missionSystemTags={myPicturesFilters.missionSystemTags}
              missionUserTags={myPicturesFilters.missionUserTags}
              pictureUserTags={myPicturesFilters.pictureUserTags}
              handleTagClick={(filterProp, filterVal) => {
                onChange({
                  [filterProp]: filterVal,
                });
              }}
            />
          </div>

          <div className="filter-dropdown-footer text-center">
            <Button className="mr-3" onClick={handleReset}>
              reset
            </Button>
            <Button
              onClick={() => {
                onApply();
                setOpen(false);
              }}
            >
              apply filters
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
});
