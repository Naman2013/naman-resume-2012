import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import UniversalTime from '../common/universal-time';
import classnames from 'classnames';

import style from './telescope-filter-nav.scss';

class TelescopeFilterNav extends Component {

  generateDynamicFilters() {
    return this.props.observatoryList.map( (observatory, index) =>  {
      return (
        <li className="col-md-3 action-container">
          <Link
            key={index}
            to={`/telescope-overview/${observatory.obsUniqueId}`}
            activeClassName="active"
            className="button">
              {observatory.obsMenuName}
          </Link>
        </li>
      )
    });
  }

  render() {
    return (
      <div className={style.telescopeFilterNav}>
        <ul className="telescopeNavList clearfix">

          <li className="col-md-3 action-container">
            <Link
              to="/telescope-overview/1"
              activeClassName="active"
              className="button">
                All Telescopes
            </Link>
          </li>

          {this.generateDynamicFilters()}

          <li className="col-md-3 push-right universal-time">
            <UniversalTime extraClass="telescope-filters-timer" />
          </li>
        </ul>
      </div>
    );
  }
}

export default TelescopeFilterNav;
