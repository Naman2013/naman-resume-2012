import React, { Fragment } from 'react';
import style from './MenuItem.style';

const MenuItem = () => (
  <Fragment>
    <li className="menu-item">
      <a className="action" href="#">Astronomical Time</a>
    </li>
    <style jsx>{style}</style>
  </Fragment>
);

export default MenuItem;
