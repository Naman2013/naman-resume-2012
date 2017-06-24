import React, { Component, PropTypes } from 'react';
import styles from './reserve-by-object.scss';

class ReserveObjectSummary extends Component {
  render() {
    const {
      objectTitle,
      objectSummary,
    } = this.props;

    return (
      <div className={styles.objectSummary}>
        <span className="title">{objectTitle}</span>
        <p>{objectSummary}</p>
      </div>
    );
  }
}

const { string } = PropTypes;
ReserveObjectSummary.propTypes = {
  objectTitle: string.isRequired,
  objectSummary: string.isRequired,
};

export default ReserveObjectSummary;
