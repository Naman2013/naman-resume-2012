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

const getObjectTypeLabel = (objectTypeList, filterType) =>
  objectTypeList.find(t => t.objectTypeFilter === filterType)
    ?.objectTypeDisplayName;

const getTelescopeLabel = (telescopeList, observatoryId, pierNumber) =>
  telescopeList.find(
    tel => tel.observatoryId === observatoryId && tel.pierNumber === pierNumber
  )?.name;

const getTimeLabel = (timeList, timeFilter) =>
  timeList.find(tl => tl.value === timeFilter)?.name;

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
        <SelectedFilterItem
          label={getObjectTypeLabel(objectTypeList, filterType)}
          onClick={() => {}}
        />
      )}
      {observatoryId && pierNumber && (
        <SelectedFilterItem
          label={getTelescopeLabel(telescopeList, observatoryId, pierNumber)}
          onClick={() => {}}
        />
      )}
      {timeFilter && (
        <SelectedFilterItem
          label={getTimeLabel(timeList, timeFilter)}
          onClick={() => {}}
        />
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
