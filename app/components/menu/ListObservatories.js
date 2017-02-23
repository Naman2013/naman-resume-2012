import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import ListObservatoryChildren from './ListObservatoryChildren';

class ListObservatories extends Component {
  state = {
    obsName: [],
    obsList: [],
  };

  componentDidMount() {
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
        <ul className="list">
          <li className="static-item scope-online">Currently Online</li>
          <li className="static-item scope-offline">Currently Offline</li>
        </ul>
        {
          this.state.obsList.map((el, i) => {
          if (typeof el.obsName !== 'undefined') {
            return (
              <ul key={el.obsName}>
                <li className="static-item">
                  <img alt="daylight status" className="obs-dayicon" src={this.getDaylingImage(el.obsDaylight)} />
                  <span className="obs-location">{el.obsName}</span>
                </li>
                <ListObservatoryChildren data={el.obsTelescopes} />
              </ul>
            );
          }
        })}
      </li>
    );
  }
}

ListObservatories.propTypes = {
  source: PropTypes.string.isRequired,
};

export default ListObservatories;
