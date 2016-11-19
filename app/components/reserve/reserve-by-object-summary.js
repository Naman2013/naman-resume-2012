import React from 'react';
import styles from './reserve-by-object.scss';

const TextBox = ({ summary }) => {
  return (
    <div className={styles.objectCategories}>
      {summary}
    </div> 
  )
};

const ReserveObjectSummary = ({ object }) => {
  return object ? <TextBox summary={object.summary} /> : null;
}

export default ReserveObjectSummary;
