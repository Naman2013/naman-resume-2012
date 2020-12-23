// @flow

import { SelectedFilterItem } from './selected-filter-item';
import _without from 'lodash/without';
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

  onApply: Function,
  onChange: Function,
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
    onApply,
    onChange,
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
    astroObjectName,
  } = selectedFilters;

  const removeFilter = (filterNames: string[]) => {
    let newFilter = {};
    filterNames.forEach(filterName => {
      newFilter[filterName] = null;
    });
    onChange(newFilter);
    onApply();
  };

  const removeLabel = (
    allLabels: string[],
    label: string,
    labelGroup: string
  ) => {
    const newLabels = _without(allLabels, label);
    onChange({ [labelGroup]: newLabels });
    onApply();
  };
  
  return (
    <>
      {dateFilter && (
        <SelectedFilterItem
          label={dateFilter}
          onClick={() => removeFilter(['dateFilter'])}
        />
      )}
      {filterType && (
        <SelectedFilterItem
          label={getObjectTypeLabel(objectTypeList, filterType)}
          onClick={() => removeFilter(['filterType'])}
        />
      )}
      {astroObjectName && (
        <SelectedFilterItem
          label={astroObjectName}
          onClick={() => removeFilter(['astroObjectName', 'astroObjectIds'])}
        />
      )}
      {observatoryId && pierNumber && (
        <SelectedFilterItem
          label={getTelescopeLabel(telescopeList, observatoryId, pierNumber)}
          onClick={() => removeFilter(['observatoryId', 'pierNumber'])}
        />
      )}
      {Boolean(timeFilter !== null) && (
        <SelectedFilterItem
          label={getTimeLabel(timeList, timeFilter)}
          onClick={() => removeFilter(['timeFilter'])}
        />
      )}

      {Boolean(missionSystemTags.length) &&
        missionSystemTags.map(tag => (
          <SelectedFilterItem
            label={tag}
            onClick={() =>
              removeLabel(missionSystemTags, tag, 'missionSystemTags')
            }
          />
        ))}

      {Boolean(missionUserTags.length) &&
        missionUserTags.map(tag => (
          <SelectedFilterItem
            label={tag}
            onClick={() => removeLabel(missionUserTags, tag, 'missionUserTags')}
          />
        ))}

      {Boolean(pictureUserTags.length) &&
        pictureUserTags.map(tag => (
          <SelectedFilterItem
            label={tag}
            onClick={() => removeLabel(pictureUserTags, tag, 'pictureUserTags')}
          />
        ))}
    </>
  );
};
