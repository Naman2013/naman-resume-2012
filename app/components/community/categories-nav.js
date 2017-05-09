import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { uniqueId } from 'lodash';
import styles from './style/categories-nav.scss';

class CategoriesNav extends Component {

  prepareNav(list, main) {
    return list.map((v) => {
      const route = `${main}/${v.route}`;
      const isActiveRoute = this.props.location.pathname.indexOf(v.route) >= 0;
      return (
        <li key={uniqueId()}>
          <Link to={route} activeClassName="active">
            {v.label}
          </Link>
          {
            (isActiveRoute && v.children && v.children.length) &&
            <ul className={styles.categoriesSubNavContainer}>
              {this.prepareNav(v.children, route)}
            </ul>
          }
        </li>
      );
    });
  }

  render() {
    const { list, className, route:{ path } } = this.props;
    return (
      <div className={`${styles.categoriesNav} ${className}`}>
        <ul className={styles.categoriesNavContainer}>
          {this.prepareNav(list, path)}
        </ul>
      </div>
    );
  }
}

export default CategoriesNav;

CategoriesNav.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};
