import React from 'react';
import SponsoredBy from '../common/sponsored-by';
import Countdown from '../../containers/Countdown';
import styles from './live-social.scss';


const LiveSocial = () => {
  return (

    <section className={styles.liveView}>

      {true ?
        <header className={styles.liveViewHeader}>
          <h2>TRANSCONTINENTAL ECLIPSE</h2>
          <SponsoredBy />
        </header>
       : ''}

      <aside className={styles.liveViewContent}>
        <Countdown size={150} className="live" lineWidth={10} />
      </aside>

      <footer className={styles.liveCameraTabs}>&nbsp;</footer>

    </section>

  );
};


export default LiveSocial;
