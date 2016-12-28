import React, { Component, PropTypes } from 'react';
import { iconPlanet } from '../tools/pulse-icon';
import styles from '../style/pulse-recommends.scss';


const PulseRecommended = ({list}) =>

  <div className={styles.pulseRecommended}>

    <header className={styles.pulseRecommendedHeader}>
      <h4>Slooh Recommends These Objects</h4>
      <p>Reserve a mission by clicking below on these visible objects…</p>
    </header>

    {list.map((v, k) =>
      <div className={styles.pulseRecommendedContainer } key={k}>
        <div className="headline">{v.headline}</div>
        <i className="icon">{iconPlanet[v.icon]}</i>
        <h5>{v.title}</h5>

        <div className="desc">{v.desc}</div>

        <div className="text">Join an <i>existing</i> mission:</div>

        <div className="date">
          <b>{v.date}</b> <br/>
          {v.time.match(/[^:]|:/g).map((e, i) => e == '·' ? <span key={i} className="dot">·</span> : e)}
        </div>

        <div className="button">
          <button className="btn-primary">Piggyback on Mission</button>
        </div>
        <div className="dotted"></div>
      </div>
    )}

  </div>;


export default PulseRecommended;

PulseRecommended.propTypes = {
  list: PropTypes.array.isRequired
};