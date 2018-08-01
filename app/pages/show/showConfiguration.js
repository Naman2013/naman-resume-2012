import React from 'react';
import uniqueId from 'lodash/uniqueId';
import flatten from 'lodash/flatten';

export const modelWithInfoBlocks = {
  name: 'DATA_WITH_SHOW_INFO_BASED_ON_STATUS',
  model: function getInfoBlocks(API_RAW) {
    const { inProgressFlag, upcomingFlag, previousFlag, v4datablocks } = API_RAW;
    const newResult = Object.assign({}, API_RAW);

    if (inProgressFlag) {
      newResult.showInfoTiles = v4datablocks.inprogress;
    }

    if (upcomingFlag) {
      newResult.showInfoTiles = v4datablocks.upcoming;
    }

    if (previousFlag) {
      newResult.showInfoTiles = v4datablocks.previous;
    }

    return newResult;
  },
};
