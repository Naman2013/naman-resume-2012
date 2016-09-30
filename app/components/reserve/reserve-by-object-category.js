import React from 'react';
import styles from './reserve-by-object.scss';

const ReserveObjectsCategory = (props) => {
  return (
    <div className={styles.objectCategories}>
      <ul>
        <li><img className="icon" src="assets/icons/saturn.svg" /> <a href="">Solar Systems</a></li>
        <li><img className="icon" src="assets/icons/Jupiter.svg" /> <a href="">Stars</a></li>
        <li><img className="icon" src="assets/icons/saturn.svg" /> <a href="">Supernovae</a></li>
        <li><img className="icon" src="assets/icons/galaxy.svg" /> <a href="">Galaxies</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Asteroids</a></li>
        <li><img className="icon" src="assets/icons/galaxy.svg" /> <a href="">Comets</a></li>
        <li><img className="icon" src="assets/icons/Jupiter.svg" /> <a href="">Star Clusters</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Nebulae</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Solar System</a></li>
        <li><img className="icon" src="assets/icons/Jupiter.svg" /> <a href="">Stars</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Supernovae</a></li>
        <li><img className="icon" src="assets/icons/galaxy.svg" /> <a href="">Galaxies</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Asteroids</a></li>
        <li><img className="icon" src="assets/icons/galaxy.svg" /> <a href="">Comets</a></li>
        <li><img className="icon" src="assets/icons/Jupiter.svg" /> <a href="">Star Clusters</a></li>
        <li><img className="icon" src="../assets/icons/saturn.svg" /> <a href="">Nebulae</a></li>
      </ul>
    </div>
  )
}

export default ReserveObjectsCategory;
