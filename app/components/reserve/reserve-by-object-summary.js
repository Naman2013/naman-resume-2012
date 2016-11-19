import React from 'react';
import styles from './reserve-by-object.scss';

const TextBox = ({ object, clearBrowse, scheduleMission }) => {
  return (
    <div className={styles.objectSummary}>
      <span className="title">{object.title}</span>
      <p>{object.summary}</p>
      <section>
        <a className="btn-primary" onClick={scheduleMission}>Schedule Mission</a>
        <a className="btn-primary" onClick={clearBrowse}>Reset Browse</a>        
      </section>
    </div> 
  );
};

const ReserveObjectSummary = (props) => {
  return props.object ? <TextBox {...props} /> : null;
}

export default ReserveObjectSummary;
