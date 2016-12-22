import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import styles from './pulse-popular.scss';
import { iconCategory } from './pulse-icon.js';

const list = [
  {
    label: "A Painting Inspired by the possibility of life on Europa",
    link: "#",
    type: "ART_CULTURE",
  }, {
    label: "New Comet Discovered by Slooh Members",
    link: "#",
    type: "SCIENCE_LOG",
  }, {
    label: "My image of the M12 Globular Cluster taken from the Canary Islands",
    link: "#",
    type: "DIY",
  }, {
    label: "My Horoscope Changed! Who Am I Now?",
    link: "#",
    type: "HUMAN_SPIRIT",
  }, {
    label: "Image of Jupiter Moon transit",
    link: "#",
    type: "SCIENCE_LOG",
  },
];


class PulsePopular extends Component {

  render() {
    return (
      <div className={styles.pulsePopular}>

        <header className={styles.header}>
          <h4>Popular Posts on Slooh Pulse</h4>
          <p>As submitted by the Slooh Community…</p>
        </header>

        <ul className={styles.popularContainer}>
          {list.map((v, k) => <li key={k}><img className={styles.icon} src={iconCategory.icon[v.type]}/><Link
            to={v.link}>{v.label}</Link></li>)}
        </ul>

      </div>
    );
  }
}

export default PulsePopular;
