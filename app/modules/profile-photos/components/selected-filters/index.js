// @flow

import { SelectedFilterItem } from 'app/modules/profile-photos/components/selected-filters/selected-filter-item';
import React from 'react';

type TFilters = {
  dateFilter: string,
  filterType: string,
  missionSystemTags: Array<string>,
  missionUserTags: Array<string>,
  observatoryId: string,
  pictureUserTags: Array<string>,
  pierNumber: string,
  timeFilter: number,
};

type TSelectedFilters = {
  selectedFilters: TFilters,
  telescopeList: any,
  timeList: any,
  objectTypeList: any,
  myPicturesFilters: any,
};

export const SelectedFilters = (props: TSelectedFilters) => {
  const {
    selectedFilters,
    telescopeList,
    timeList,
    objectTypeList,
    myPicturesFilters,
  } = props;

  const {
    dateFilter,
    filterType,
    observatoryId,
    pierNumber,
    timeFilter,
    missionSystemTags = [],
    missionUserTags = [],
    pictureUserTags = [],
  } = selectedFilters;

  console.log(props);

  return (
    <>
      {dateFilter && (
        <SelectedFilterItem label={dateFilter} onClick={() => {}} />
      )}
      {filterType && (
        <SelectedFilterItem label={filterType} onClick={() => {}} />
      )}
      {observatoryId && (
        <SelectedFilterItem label={observatoryId} onClick={() => {}} />
      )}
      {pierNumber && (
        <SelectedFilterItem label={pierNumber} onClick={() => {}} />
      )}
      {timeFilter && (
        <SelectedFilterItem label={timeFilter} onClick={() => {}} />
      )}

      {Boolean(missionSystemTags.length) &&
        missionSystemTags.map(tag => (
          <SelectedFilterItem label={tag} onClick={() => {}} />
        ))}

      {Boolean(missionUserTags.length) &&
        missionUserTags.map(tag => (
          <SelectedFilterItem label={tag} onClick={() => {}} />
        ))}

      {Boolean(pictureUserTags.length) &&
        pictureUserTags.map(tag => (
          <SelectedFilterItem label={tag} onClick={() => {}} />
        ))}
    </>
  );
};
