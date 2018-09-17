/***********************************
* V4 Dashboard Nav
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import styles from './DashboardNav.style';
import {
  missions,
  guides,
  quests,
  shows,
  stories,
  groups,
} from 'styles/variables/iconURLs';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

class DashboardNav extends Component {
  static propTypes = {
  };

  static defaultProps = {

  };


  state = {
  };

  render() {
    const {
    } = this.props;

    return (
      <div className="root">
        <div className="dash-nav-item">
          <Link to="/missions">
            <img alt="missions" src={missions} />
            <div className="title-item">missions</div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/guides">
            <img alt="guides" src={guides} />
            <div className="title-item">guides</div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/quests">
            <img alt="quests" src={quests} />
            <div className="title-item">quests</div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/shows">
            <img alt="shows" src={shows} />
            <div className="title-item">shows</div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/stories">
            <img alt="stories" src={stories} />
            <div className="title-item">stories</div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/community-groups/public">
            <img alt="groups" src={groups} />
            <div className="title-item">groups</div>
          </Link>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DashboardNav;
