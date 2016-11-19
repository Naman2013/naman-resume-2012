import React from 'react';
import styles from './reserve-by-object.scss';

const TextBox = ({ summary, title }) => {
  return (
    <div className={styles.objectSummary}>
      <header>{title}</header>
      <p>{summary}</p>
      <section>
        <a className="btn" >Schedule Mission</a>
        <a className="btn" >Reset Browse</a>        
      </section>
    </div> 
  )
};

const ReserveObjectSummary = ({object}) => {
  return object ? <TextBox {...object} /> : null;
}

export default ReserveObjectSummary;
