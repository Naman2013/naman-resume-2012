import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ListObservatoryChildren from './ListObservatoryChildren';

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

  getDaylingImage(daylight) {
    if (daylight) {
      return '../assets/images/nav/menu-day.png';
    }

    return '../assets/images/nav/menu-night.png';
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
                  <a href={el.obsTeleOverviewURL} className="obs-location">
                    <img alt="daylight status" className="obs-dayicon" src={this.getDaylingImage(el.obsDaylight)} />
                    <span className="obs-location">{el.obsName}</span>
                  </a>
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
