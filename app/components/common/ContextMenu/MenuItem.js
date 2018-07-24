import React, { Fragment } from 'react';
import MiraDot from 'atoms/icons/MiraDot';
import style from './MenuItem.style';

const MenuItem = () => (
  <Fragment>
    <li className="menu-item">
      <span className="dot-container">
        <MiraDot />
      </span>
      <a className="action" href="#">Astronomical Time</a>
    </li>
    <style jsx>{style}</style>
  </Fragment>
);

export default MenuItem;
