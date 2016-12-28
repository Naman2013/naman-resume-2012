import React, { Component } from 'react';
import Countdown from '../../containers/Countdown';
import Member from '../../containers/Member';
import styles from '../../styles/header.scss';

const Header = () =>
  <header className={styles.mainHeader}>
    <div className={styles.mainHeaderLogo}/>
    <div className={styles.mainHeaderLogoText}>
      Slooh <span className="beta">beta</span>
    </div>
    <Member />
    <Countdown />
  </header>;

export default Header;
