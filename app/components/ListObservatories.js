import React, { Component } from 'react';
import ListObservatoryChildren from './ListObservatoryChildren';

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
      return 'assets/images/nav/menu-day.png';
    } else {
      return 'assets/images/nav/menu-night.png';
    }
  }

  serverRequest = () => {
    $.get(this.props.source, ({ observatoryList }) => {
      this.setState({ obsList: observatoryList });
    });
  };

  render() {
    return (
      <div>
        <h3>Observatories</h3>
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
