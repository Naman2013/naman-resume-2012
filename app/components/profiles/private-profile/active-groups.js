import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import GroupTiles from '../../groups-hub/group-tiles';
import { HeaderWithCounter } from '../../header-with-counter';

export const ActiveGroups = (props) => {
  const { count, list } = props; //eslint-disable-line
  return (
    <Fragment>
      <HeaderWithCounter
        txt={<FormattedMessage id="Profile.Groups" className="heading" />}
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
