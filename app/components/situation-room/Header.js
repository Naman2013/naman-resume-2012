import React, { PropTypes } from 'react';
import UniversalTime from '../../components/common/universal-time';
import s from './Header.scss';

const Header = ({ videoInProgress }) =>
  <header className={s.liveHeader}>
    {
      videoInProgress ? <span className="live">live</span> : null
    }
    <img alt="Space Situation Room" src="/assets/images/logos/space-situation-room-logo.svg" height="65" />
    {
      videoInProgress ? <span className="live">live</span> : null
    }
    <UniversalTime extraClass={s.liveHeaderUTC} />
  </header>;

Header.defaultProps = {
  videoInProgress: false,
};

Header.propTypes = {
  videoInProgress: PropTypes.bool,
};

export default Header;
