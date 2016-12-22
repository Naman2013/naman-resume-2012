import React, { Component, PropTypes } from 'react';
import styles from './pulse-recommends.scss';
import { iconPlanet } from './pulse-icon';

const list = [
  {
    headline: "As featured in the first Outer Limits episode.",
    icon: "galaxy",
    title: "Andromeda Galaxy (M31)",
    desc: "Closest galaxy to the Milky Way. In approx. 4.5 billion years it will collide with the Milky Way, creating a giant elliptical galaxy.",
    date: "Thursday, October 18th 10:05pm EST  ·  7:05pm PST  ·  03:05 UTC",
  }, {
    headline: "Don’t miss the red spot!",
    icon: "jupiter",
    title: "Jupiter",
    desc: "The planet Jupiter is fifth out from the Sun, and two and a half times more massive than all the other planets in the solar system combined.",
    date: "Thursday, October 18th 10:05pm EST  ·  7:05pm PST  ·  03:05 UTC",
  }
];

class PulseRecommended extends Component {

  render() {
    return (
      <div className={styles.pulseRecommended}>

        <header className={styles.header}>
          <h4>Slooh Recommends These Objects</h4>
          <p>Reserve a mission by clicking below on these visible objects…</p>
        </header>

        {list.map((v, k) =>
          <div className={styles.recommendedContainer} key={k}>
            <div className="headline">{v.headline}</div>
            <i className="icon">{iconPlanet[v.icon]}</i>
            <h4>{v.title}</h4>

            <div className="desc">{v.desc}</div>

            <div className="text">Join an existing mission:</div>

            <div className="text">{v.date}</div>

            <div className="button">
              <button className="btn-primary">Piggyback on Mission</button>
            </div>
            <div className="dotted"></div>
          </div>
        )}

      </div>
    );
  }
}

export default PulseRecommended;
