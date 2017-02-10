import React, { PropTypes } from 'react';
import s from './HeadshotAccountDetail.scss';

const HeadshotAccountDetail = ({ membershipLevel, profileImageURL, membershipType }) => (
  <div className={s.headshotAccountDetailRoot}>
    <div className={s.accountDetail}>
      <p>{membershipLevel}</p>
    </div>

    {
      profileImageURL ?
        <div style={{ backgroundImage: `url(${profileImageURL})` }} className={`${s.profilePicture}`} />
        :
        <div className={`${s.profilePicture}`} />
    }


    <div className={s.accountDetail}>
      <p>{membershipType}</p>
    </div>
  </div>
);

HeadshotAccountDetail.defaultProps = {
  profileImageURL: '',
};

HeadshotAccountDetail.propTypes = {
  membershipLevel: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string,
  membershipType: PropTypes.string.isRequired,
};

export default HeadshotAccountDetail;
