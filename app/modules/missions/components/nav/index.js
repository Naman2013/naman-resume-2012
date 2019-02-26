import React from 'react';
import { Link } from 'react-router';
import styles from './styles.module.scss';

const els = [
  { title: 'By Slooh 1000', linkURL: 'missions/slooh-1000' },
  { title: 'By Catalog', linkURL: 'missions/catalog' },
  { title: 'By Telescope', linkURL: 'missions/telescope' },
];

export const Nav = () => {
  return (
    <ul className="list-inline">
      {els.map(el => (
        <li key={el.linkURL}>
          <Link activeClassName="active-menu-item" to={el.linkURL}>
            {el.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
