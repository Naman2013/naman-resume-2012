import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import styles from './mission-card.scss';

class MissionCard extends Component {

  render() {
    let featured = this.props.featured;
    let className = `${styles.missionCard} ${featured ? 'featured' : 'secondary'} ${this.props.className || ''}`;
    //console.log(this);
    return (
      <div className={className}>
        {featured ? <span className="callOut">Don't Miss</span> : null}
        <h2>On a 4 Billion Year Collision Course With The Milky Way…</h2>

        <div className={styles.cardsubTitle}>
          <img className={styles.cardIcon} src="../../../assets/icons/Jupiter.svg" />
          <h3>Andromeda Galaxy (M31)</h3>
        </div>

        <p>Closest galaxy to the Milky Way. In approximately 4.5 billion years it will collide with the Milky Way to create a giant elliptical galaxy. It’s a great time of year to check it out as skies are generally crystal clear over Chile.</p>


        <div className="join-mission-callout">
          <h5>Join an existing mission</h5>
          <p><strong>Thursday, October 18th</strong>: {!featured ? <br /> : null} 10:05pm EST  ·  7:05pm PST  ·  03:05 UTC 03:05 UTC</p>
          <a className={styles.piggybackCta} href="#">Piggyback on mission</a>
        </div>
      </div>
    );
  }
}

export default MissionCard;
