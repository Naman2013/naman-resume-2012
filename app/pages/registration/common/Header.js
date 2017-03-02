import React, { PropTypes } from 'react';
import s from './Header.scss';

/**
  @param membershipTier: examples are Slooh Crew or Apprentice
*/

const Header = ({ title, text }) => (
  <header className={s.registrationHeader}>
    <div className={s.loggedInStatus}>
      {title}
    </div>
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
