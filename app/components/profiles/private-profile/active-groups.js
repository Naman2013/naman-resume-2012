/* eslint-disable */
import React, {Fragment} from 'react';
import {FormattedMessage} from 'react-intl';
import GroupTiles from '../../groups-hub/group-tiles';

export const ActiveGroups = (props) => {
  const {count, list} = props;
  return <Fragment>
    <div className="header">
      <FormattedMessage id="Profile.Groups"/>
      <span>({count})</span>
    </div>
    <div className="groups">

      <GroupTiles
        closeModal={() => {}}
        updateGroupItemInfo={() => {}}
        updatePrompt={() => {}}
        groups={list}
      />

    </div>
  </Fragment>;
};
