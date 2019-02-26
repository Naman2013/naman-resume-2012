import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const HeaderWithCounter = (props) => {
  const { txt, count } = props;
  return (
    <div className={styles.headerWithCounter}>
      <span>{txt}</span> <span className={styles.counter}>({count})</span>
    </div>
  );
};

HeaderWithCounter.propTypes = {
  txt: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};
