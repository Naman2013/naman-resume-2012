/** *********************************
 * V4 Dashboard Nav
 *
 *
 *
 ********************************** */
import React, { Component } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import {
  missions,
  guides,
  quests,
  shows,
  stories,
  groups,
} from 'app/styles/variables/iconURLs';
import messages from './DashboardNav.messages';
import styles from './DashboardNav.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

@withTranslation
class DashboardNav extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {};

  render() {
    const { t } = useTranslation();

    return (
      <div className="root">
        <div className="dash-nav-item">
          <Link to="/missions">
            <div className="link-container">
              <img alt="missions" src={missions} />
              <div className="title-item">{t('.missions')}</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/guides/all">
            <div className="link-container">
              <img alt="guides" src={guides} />
              <div className="title-item">{t('.guides')}</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/quests">
            <div className="link-container">
              <img alt="quests" src={quests} />
              <div className="title-item">{t('.quests')}</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/shows">
            <div className="link-container">
              <img alt="shows" src={shows} />
              <div className="title-item">{t('.shows')}</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/stories">
            <div className="link-container">
              <img alt="stories" src={stories} />
              <div className="title-item">{t('.stories')}</div>
            </div>
          </Link>
        </div>
        <div className="dash-nav-item">
          <Link to="/groups">
            <div className="link-container">
              <img alt="clubs" src={groups} />
              <div className="title-item">{t('.clubs')}</div>
            </div>
          </Link>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default DashboardNav;
