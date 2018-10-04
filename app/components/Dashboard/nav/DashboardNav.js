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
            <div className="link-container">
              <img alt="missions" src={missions} />
              <div className="title-item">missions</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/guides/all">
            <div className="link-container">
              <img alt="guides" src={guides} />
              <div className="title-item">guides</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/quests">
            <div className="link-container">
              <img alt="quests" src={quests} />
              <div className="title-item">quests</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/shows">
            <div className="link-container">
              <img alt="shows" src={shows} />
              <div className="title-item">shows</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/stories">
            <div className="link-container">
              <img alt="stories" src={stories} />
              <div className="title-item">stories</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/community-groups/public">
            <div className="link-container">
              <img alt="groups" src={groups} />
              <div className="title-item">groups</div>
            </div>
          </Link>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DashboardNav;
