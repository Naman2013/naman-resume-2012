import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import style from './telescope-filter-nav.scss';

class TelescopeFilterNav extends Component {
  render() {

    const navListStyles = classnames({
      'clearfix': true,
      'telescopeNavList': true
    });

    return (
      <div className={style.telescopeFilterNav}>
        <ul className="telescopeNavList clearfix">
          <li className="col-md-3 action-container"><a href="" className={style.button}>All Telescopes</a></li>
          <li className="col-md-3 action-container"><a href="" className={style.button}>Canary Island Telescopes</a></li>
          <li className="col-md-3 action-container"><a href="" className={style.button}>Chili Telescopes</a></li>
          <li className="col-md-3 push-right universal-time">
            <span className="light-gray">Universal Time: </span><span className="time"><b>01:26:42</b></span>
            <br />
            <a className="time-action pink" href="">What is UTC?</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default TelescopeFilterNav;
