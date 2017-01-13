import React, { Component } from 'react';
import ListHotThisMonth from './ListHotThisMonth';
import ListObservatories from './ListObservatories';
import UpcomingComponent from './UpcomingComponent';
import { hashHistory } from 'react-router';
import { deactivateMenu } from '../../modules/Menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    deactivateMenu,
  }, dispatch),
});

@connect(null, mapDispatchToProps)
class Submenu extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event, link) {
    event.preventDefault();
    hashHistory.push(link);
    this.props.actions.deactivateMenu();
  }

  render() {
    return (
      <section className="left-submenu">
        <ul>
          {this.props.data.map((child, i) => {
            if (typeof child.label !== 'undefined') {
              switch (child.label.en) {
                case 'Upcoming Shows': {
                  return <UpcomingComponent key={i} source="/api/events/upcoming?limit=50" refreshIntervalDelay={60000} />;
                }
                case 'All Telescopes': {
                  return <ListObservatories key={i} source="/api/obs/compact" refreshIntervalDelay={60000} />;
                }
                case 'Hot this Month': {
                  return <ListHotThisMonth key={i} source="/api/hot/thisMonth" />;
                }
                default: {
                  return (
                    <li key={i}>
                      <a className="item" onClick={(event) => { this.handleClick(event, child.link); }}>
                        {child.label.en}
                      </a>
                    </li>
                  );
                }
              }
            }
          })}
        </ul>
      </section>
    );
  }
}

export default Submenu;
