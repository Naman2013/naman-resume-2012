import React, { PropTypes } from 'react';
import s from './header.scss';

const Header = ({ headerCopy, subHeaderCopy }) => (
  <div>
    <header className={s.settingsPageHeader}>
      <h1 className={s.headerCopy}>{headerCopy}</h1>
      {
        subHeaderCopy ? <h2 className={s.subHeaderCopy}>{subHeaderCopy}</h2> : null
      }
    </header>
  </div>
);

Header.defaultProps = {
  subHeaderCopy: '',
};

Header.propTypes = {
  headerCopy: PropTypes.string.isRequired,
  subHeaderCopy: PropTypes.string,
};

export default Header;
