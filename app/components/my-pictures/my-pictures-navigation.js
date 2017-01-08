import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from "./my-pictures-navigation.scss"

class MyPicturesNavigation extends Component {
  render() {
    return(
      <nav className={styles.myPictureNavigation}>
        <ul>
          <li><Link to="my-pictures/photo-roll" activeClassName="active" >Photo Roll <span>({this.props.count})</span></Link></li>
          <li><Link to="my-pictures/missions" activeClassName="active" >Missions  <span>(49)</span></Link></li>
        </ul>
      </nav>
    );
  }
}

export default MyPicturesNavigation;
