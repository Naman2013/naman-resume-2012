import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import axios from 'axios';
import purgeHashURL from '../../utils/purgeHashURL';
import ListObservatoryChildren from './ListObservatoryChildren';

function getDaylingImage(daylight) {
  if (daylight) {
    return 'https://vega.slooh.com/icons/nav/menu-day.png';
  }

  return 'https://vega.slooh.com/icons/nav/menu-night.png';
}

class ListObservatories extends Component {
  state = {
    obsName: [],
    obsList: [],
  };

  componentWillMount() {
    this.serverRequest();
    this.refreshIntervalId = setInterval(this.serverRequest, this.props.refreshIntervalDelay);
  }

  componentWillUnmount() {
    clearInterval(this.refreshIntervalId);
  }

  serverRequest = () => {
    axios.get(this.props.source)
    .then((response) => {
      this.setState({
        obsList: response.data.observatoryList,
      });
    });
  };

  render() {
    return (
      <li className="observatory-list">
        <h4 className="menu-title">All Telescopes</h4>
        {
          this.state.obsList.map((el, i) => {
            if (typeof el.obsName !== 'undefined') {
              return (
                <ul key={el.obsName}>
                  <li className="static-item">
                    <Link to={purgeHashURL(el.obsTeleOverviewURL)} className="obs-location">
                      <img alt="daylight status" className="obs-dayicon" src={getDaylingImage(el.obsDaylight)} />
                      <span className="obs-location">{el.obsName}</span>
                    </Link>
                  </li>
                  <ListObservatoryChildren data={el.obsTelescopes} />
                </ul>
              );
            }
          })}
        <ul className="list status-legend">
          <li className="static-item scope-online">Currently Online</li>
          <li className="static-item scope-offline">Currently Offline</li>
        </ul>
      </li>
    );
  }
}

ListObservatories.propTypes = {
  source: PropTypes.string.isRequired,
};

export default ListObservatories;
