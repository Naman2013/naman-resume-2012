import React, { PropTypes } from 'react';
import s from './Header.scss';

/**
  @param membershipTier: examples are Slooh Crew or Apprentice
*/

const Header = ({ membershipTier, text }) => (
  <header className={s.registrationHeader}>
    {
      membershipTier ?
        <div className={s.loggedInStatus}>
          You are logged in as a {membershipTier} member
        </div> : null
    }
    <h1 className={s.upgradeStatus}>
      {text}
    </h1>
  </header>
);

Header.defaultProps = {
  membershipTier: '',
};

Header.propTypes = {
  membershipTier: PropTypes.string,
  text: PropTypes.string.isRequired,
};

export default Header;
