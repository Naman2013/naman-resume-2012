import React, { Component } from 'react';
import ListHotThisMonth from './../components/ListHotThisMonth';
import ListObservatories from './../components/ListObservatories';
import UpcomingComponent from './../components/UpcomingComponent';

export default class Submenu extends Component {
  render() {
    return (
      <section className="left-submenu">
        <ul>
            {this.props.data.map((child, i) => {
              if (typeof child.label !== 'undefined') { // FIXME: Is imposible when server return undefined
                switch (child.label.en) {
                  case 'Upcoming Shows': {
                    return <UpcomingComponent key={i} source="/api/events/upcoming?limit=50" refreshIntervalDelay={60000} />;
                  }
                  case 'Observatories': {
                    return <ListObservatories key={i} source="/api/obs/compact" refreshIntervalDelay={60000} />;
                  }
                  case 'Hot this Month': {
                    return <ListHotThisMonth key={i} source="/api/hot/thisMonth" />;
                  }
                  default: {
                    return <p key={i} className="childlist"><a href={child.link}>{child.label.en}</a></p>;
                  }
                }
              }
            })}
        </ul>
      </section>
    );
  }
}
