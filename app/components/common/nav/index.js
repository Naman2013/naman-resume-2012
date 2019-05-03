import React from 'react';
import { Link } from 'react-router';
import './styles.scss';

const Nav = props => {
  const { items } = props;
  return (
    <div className="nav-container container-fluid">
      <ul className="list-inline nav-items d-none d-sm-block">
        {items.map(el => (
          <li key={el.linkURL || el.linkUrl} className="list-inline-item">
            <Link
              activeClassName="active-menu-item"
              to={el.linkURL || el.linkUrl}
            >
              {el.title || el.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
