import { HeaderWithCounter } from 'app/components/header-with-counter';
import PropTypes from 'prop-types';
import React from 'react';
import GroupTiles from '../../groups-hub/group-tiles';
import styles from './active-groups.module.scss';

export const ActiveGroups = props => {
  const { count, list, header } = props;
  return (
    <div className={styles.activeGroups}>
      <HeaderWithCounter txt={header} count={count} />
      <div className={styles.groupsWrapper}>
        <GroupTiles
          closeModal={() => {}}
          updateGroupItemInfo={() => {}}
          updatePrompt={() => {}}
          groups={list}
        />
      </div>
    </div>
  );
};

ActiveGroups.propTypes = {
  count: PropTypes.number.isRequired,
  list: PropTypes.arrayOf().isRequired,
  header: PropTypes.string.isRequired,
};
