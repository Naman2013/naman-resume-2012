import LailaTile from 'app/components/common/tiles/LailaTile';
import { HeaderWithCounter } from 'app/components/header-with-counter';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './active-objects.module.scss';

export const ActiveObjects = props => {
  const { count, list = [], header } = props;
  return (
    <div className={styles.activeObjects}>
      <HeaderWithCounter txt={header} count={count} />
      <div className={styles.objectsWrapper}>
        {list.map(obj => (
          <LailaTile
            key={obj.objectId}
            iconURL={obj.iconUrl}
            title={obj.title}
            linkURL={obj.linkUrl}
          />
        ))}
      </div>
    </div>
  );
};

ActiveObjects.propTypes = {
  count: PropTypes.number.isRequired,
  list: PropTypes.arrayOf().isRequired,
  header: PropTypes.string.isRequired,
};
