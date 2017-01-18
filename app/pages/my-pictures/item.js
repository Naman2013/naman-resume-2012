import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './my-pictures-item.scss';


export function Item({ image }) {
  return (
    <div
      className={`${styles.MyPicturesItem} ${styles.MyPicturesItemRoll}`}
      style={{ backgroundImage: `url(${image.imageURL})` }}
    />
  );
}

export function ItemMission({ image }) {
  return (
    <Link
      className={styles.MyPicturesItem}
      to={`my-pictures/missions/${image.scheduledMissionId}`}
      style={{ backgroundImage: `url(${image.imageURL})` }}
    >
      <div className="row"> <b>{image.imageTitle} </b> <br /> {image.missionDate} </div>
      <div className="row"><img src={image.objectIconURL} alt={image.imageTitle} /></div>
      <div className="row">{image.fitsIsAvailable ? <span className="fits">FITS</span> : ''}</div>
    </Link>
  );
}


Item.propTypes = {
  image: PropTypes.object,
};


ItemMission.propTypes = {
  image: PropTypes.object,
};

