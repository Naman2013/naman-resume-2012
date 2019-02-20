import LailaTile from 'app/components/common/tiles/LailaTile';
import { HeaderWithCounter } from 'app/components/header-with-counter';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './active-objects.module.scss';

export const ActiveObjects = (props) => {
  const { count, list = [] } = props;
  return (
    <Fragment>
      <HeaderWithCounter
        txt={<FormattedMessage id="Profile.Objects" />}
        count={count}
      />
      <div className={styles.objectsWrapper}>
        {list.map(obj => (<LailaTile
          key={obj.objectId}
          iconURL={obj.iconUrl}
          title={obj.imageTitle}
          linkURL={obj.linkUrl}
        />))}

      </div>
    </Fragment>
  );
};

ActiveObjects.propTypes = {
  count: PropTypes.number.isRequired,
  list: PropTypes.arrayOf().isRequired,
};
