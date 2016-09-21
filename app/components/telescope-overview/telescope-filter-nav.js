import React, { Component, PropTypes } from 'react';
import UniversalTime from '../common/universal-time';
import FilterLink from './filter-link';
import classnames from 'classnames';

import style from './telescope-filter-nav.scss';

class TelescopeFilterNav extends Component {

  generateDynamicFilters() {
    return this.props.observatoryList.map( (observatory, index) =>  (
      <FilterLink key={index} {...observatory} />
    ));
  }

  render() {

    return (
      <div className={style.telescopeFilterNav}>
        <ul className="telescopeNavList clearfix">

          <li className="col-md-3 action-container"><a href="" className="button active">All Telescopes</a></li>

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
