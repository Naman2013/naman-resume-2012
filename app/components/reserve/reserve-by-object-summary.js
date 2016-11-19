import React from 'react';
import styles from './reserve-by-object.scss';

const TextBox = ({ summary, title }) => {
  return (
    <div className={styles.objectSummary}>
      <span className="title">{title}</span>
      <p>{summary}</p>
      <section>
        <a className="btn-primary" >Schedule Mission</a>
        <a className="btn-primary" >Reset Browse</a>        
      </section>
    </div> 
  );
};

const ReserveObjectSummary = ({object}) => {
  return object ? <TextBox {...object} /> : null;
}

export default ReserveObjectSummary;
