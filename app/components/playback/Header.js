import React from 'react';
import s from './Header.scss';

function Header() {
  return (
    <div className={s.playbackHeaderRoot}>
      <h1 className={s.title}>Browse Shows</h1>
    </div>
  );
}

export default Header;
