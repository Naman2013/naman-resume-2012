import React, { Component } from 'react';
import ListObservatoryChildren from './ListObservatoryChildren';
import axios from 'axios';

export default class ListObservatories extends Component {
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
      return '../images/nav/menu-day.png';
    } else {
      return '../images/nav/menu-night.png';
    }
  }

  serverRequest = () => {
       axios.get(this.props.source) 
     .then(response => {
      this.setState({
        obsList: response.data.observatoryList
      });
    })
    .catch(function (error) {
      console.log('error: '+error);
    });
 
  };



  render() {
    return (
      <div className="observatory-list">
        <h4>All Telescopes</h4>
        {this.state.obsList.map((el, i) => {
          if (typeof el.obsName !== 'undefined') {
            return (
              <ul key={i}>
                <li>
                  <img className="obs-dayicon" src={this.getDaylingImage(el.obsDaylight)} />
                  <span className="obs-location">{el.obsName}</span>
                </li>
                <ListObservatoryChildren data={el.obsTelescopes}/>
              </ul>
            );
          }
        })}
        <div className="obs-status-legend">
          <p className="scope_online">Currently Online</p>
          <p className="scope_offline">Currently Offline</p>
        </div>
      </div>
    );
  }
}
