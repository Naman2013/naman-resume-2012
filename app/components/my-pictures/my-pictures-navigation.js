import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './my-pictures-navigation.scss';

const MyPicturesNavigation = ({ count }) => {
  return (
    <nav className={styles.myPictureNavigation}>
      <ul>
        <li>
          <Link to="my-pictures/photoRoll" activeClassName="active">
            Photo Roll<span>({count})</span>
          </Link>
        </li>
        <li>
          <Link to="my-pictures/missions" activeClassName="active">
            Missions <span>({count})</span>
          </Link>
        </li>
      </ul>
    </nav>
  );

};

MyPicturesNavigation.propTypes = {
  count: PropTypes.number,
};


export default MyPicturesNavigation;
