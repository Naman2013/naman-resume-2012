import React from 'react';
import { Link } from 'react-router';
import UniversalTime from '../common/universal-time';
import styles from './reserve-banner.scss';

const ReserveBanner = () => {
  return (
    <div className={styles.reserveBanner}>
      <div className="title col-md-5 pull-left">
        <h1>Reserve Telescopes</h1>
      </div>
      <section className="pull-right align-right">
        <UniversalTime />
        <div className="button-nav">
          <Link className="button btn-primary" to="/settings/dashboard">
            View Reservations
          </Link>
        </div>
      </section>
    </div>
  )
};

export default ReserveBanner;
