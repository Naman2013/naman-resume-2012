import { HeaderWithCounter } from 'app/components/header-with-counter';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import GroupTiles from '../../groups-hub/group-tiles';
import styles from './active-groups.module.scss';

export const ActiveGroups = (props) => {
  const { count, list } = props; //eslint-disable-line
  return (
    <div className={styles.activeGroups}>
      <HeaderWithCounter
        txt={<FormattedMessage id="Profile.Groups" />}
        count={count}
      />
      <div className={styles.groupsWrapper}>

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
    </div>
  );
};
