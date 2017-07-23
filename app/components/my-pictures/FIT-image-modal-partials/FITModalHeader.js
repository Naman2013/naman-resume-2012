import React from 'react';
import PropTypes from 'prop-types';
import ByUserTag from '../../common/by-user-tag/by-user-tag';
import s from './FITModalHeader.scss';

export default function FITModalHeader({
  headerTitle,
  ownerLocation,
  ownerFirstName,
  ownerDisplayName,
  ownerMembershipType,
  ownerMemberSince,
  ownerAvatarURL,
  missionDateTime,
  missionIconURL,
  missionObsName,
  missionPierName,
  missionTitle,
  takenByText,
}) {
  return (
    <div className={s.FITModalHeader}>
      <div className={s.FITModalHeaderBar}>
        <h1 className={s.FITTitle}>{headerTitle}</h1>
      </div>

      <div className={s.titleBody}>
        <p className={s.titleLine}><img src={missionIconURL} alt="" height="35" /> {missionTitle}</p>
        <p className={s.titleLine}>{missionObsName}</p>
        <p className={s.titleLine}>{missionPierName}</p>
        <p className={s.titleLine}>{missionDateTime}</p>
      </div>

      <div className={s.takenBy}>

        <span className={s.inlineLabel}>{takenByText}</span>

        <ByUserTag
          name={ownerDisplayName}
          accountType={ownerMembershipType}
          memberSince={ownerMemberSince}
          location={ownerLocation}
          photo={ownerAvatarURL}
          theme="light"
        />
      </div>
    </div>
  );
}

FITModalHeader.propTypes = {
  missionDateTime: PropTypes.string.isRequired,
  missionIconURL: PropTypes.string.isRequired,
  missionObsName: PropTypes.string.isRequired,
  missionPierName: PropTypes.string.isRequired,
  missionTitle: PropTypes.string.isRequired,
  headerTitle: PropTypes.string.isRequired,
  ownerLocation: PropTypes.string.isRequired,
  ownerFirstName: PropTypes.string.isRequired,
  ownerDisplayName: PropTypes.string.isRequired,
  ownerMembershipType: PropTypes.string.isRequired,
  ownerMemberSince: PropTypes.string.isRequired,
  ownerAvatarURL: PropTypes.string.isRequired,
  takenByText: PropTypes.string.isRequired,
};
