import React, { PropTypes } from 'react'
import UniversalTime from '../../components/common/universal-time';
import styles from './Header.scss';

const Header = ({ videoInProgress }) =>
  <header className={styles.liveHeader}>
    {
      videoInProgress ? <span className="live">live</span> : null
    }
    <h1>SPACE SITUATION ROOM</h1>
    {
      videoInProgress ? <span className="live">live</span> : null
    }
    <UniversalTime extraClass={styles.liveHeaderUTC} />
  </header>;

Header.defaultProps = {
  videoInProgress: false,
};

Header.propTypes = {
  videoInProgress: PropTypes.bool,
};

export default Header;
