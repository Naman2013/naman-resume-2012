import React, { Component, PropTypes } from 'react';
import UniversalTime from '../common/universal-time';
import FilterLink from './filter-link';
import classnames from 'classnames';

import style from './telescope-filter-nav.scss';

class TelescopeFilterNav extends Component {

  generateDynamicFilters() {

    return this.props.observatoryList.map( observatory =>  (
      <FilterLink {...observatory} />
    ));

    return null
    // return this.props.observatoryList
    //   .map(observatoryFilter =>
    //     <li
    //       className="col-md-3 action-container">
    //         <a href={`/#telescope-overview/${observatoryFilter.obsUniqueId}`} className="button">
    //           { observatoryFilter.obsMenuName }
    //         </a>
    //     </li>);
  }

  render() {

    console.log();
    console.log(this.props);

    return (
      <div className={style.telescopeFilterNav}>
        <ul className="telescopeNavList clearfix">

          <li className="col-md-3 action-container"><a href="" className="button active">All Telescopes</a></li>
          {this.generateDynamicFilters()}
          {
            /*
              <li className="col-md-3 action-container"><a href="" className="button">Canary Island Telescopes</a></li>
              <li className="col-md-3 action-container"><a href="" className="button">Chile Telescopes</a></li>
            */
          }
          <li className="col-md-3 push-right universal-time">
            <UniversalTime extraClass="telescope-filters-timer" />
          </li>
        </ul>
      </div>
    );
  }
}

export default TelescopeFilterNav;
