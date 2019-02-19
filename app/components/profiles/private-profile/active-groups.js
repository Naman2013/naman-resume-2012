import { HeaderWithCounter } from 'app/components/header-with-counter';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import GroupTiles from '../../groups-hub/group-tiles';

export const ActiveGroups = (props) => {
  const { count, list } = props; //eslint-disable-line
  return (
    <Fragment>
      <HeaderWithCounter
        txt={<FormattedMessage id="Profile.Groups" />}
        count={count}
      />
      <div className="groups">

        <GroupTiles
          closeModal={() => {
          }}
          updateGroupItemInfo={() => {
          }}
          updatePrompt={() => {
          }}
          groups={list}
        />

      </div>
    </Fragment>
  );
};
