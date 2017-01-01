import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import styles from './style/pulse-nav.scss';

class PulseNav extends Component {

  prepareNav(list, main){
    return list.map((v, k) => {

      const route = `${main}/${v.route}`;

      return (

        <li key={k}>
          <Link to={route} activeClassName="active">
            {v.label}
          </Link>
          {!v.children ? "" :
            <ul className={styles.pulseSubNavContainer}>
              {this.prepareNav(v.children, route)}
            </ul>
          }
        </li>
      )
    });
  }

  render() {

    const { list, className, route:{ path } } = this.props;

    return (
      <div className={`${styles.pulseNav} ${className}`}>
        <ul className={styles.pulseNavContainer}>
          {this.prepareNav(list, path)}
        </ul>
      </div>
    );
  }
}

export default PulseNav;

PulseNav.propTypes = {
  route: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
};