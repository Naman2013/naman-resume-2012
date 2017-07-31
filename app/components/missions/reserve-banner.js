import React from 'react';
import { Link } from 'react-router';
import UniversalTime from '../common/universal-time';
import styles from './reserve-banner.scss';

const ReserveBanner = () => {
  return (
    <div className={styles.reserveBanner}>
      <div className="title col-md-7">
        <h1>Reserve Telescopes</h1>
      </div>
      <section className="col-md-4 align-right">
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
