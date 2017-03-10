import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Mission.scss';

function Mission({
  scheduledMissionId,
  imageURL,
  imageTitle,
  missionDate,
  objectIconURL,
  fitsIsAvailable,
}) {
  return (
    <Link
      className={styles.missionContainer}
      to={`my-pictures/missions/${scheduledMissionId}`}
      style={{ backgroundImage: `url(${imageURL})` }}
    >
      <div className="content">
        <div className="row"> <b>{imageTitle} </b> <br /> {missionDate} </div>
        <div className="row"><img height="80" src={objectIconURL} alt={imageTitle} /></div>
        <div className="row">{fitsIsAvailable ? <span className="fits">FITS</span> : ''}</div>
      </div>
  </Link>
  );
}

Mission.defaultProps = {
  scheduledMissionId: -1, // set to -1 since real ID's should never be negative
};

Mission.propTypes = {
  scheduledMissionId: PropTypes.number,
  imageURL: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  missionDate: PropTypes.string.isRequired,
  objectIconURL: PropTypes.string.isRequired,
  fitsIsAvailable: PropTypes.bool.isRequired,
};

export default Mission;
