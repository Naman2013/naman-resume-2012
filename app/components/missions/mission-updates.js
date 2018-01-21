import React, { Component, Props } from 'react';
import MissionUpdatePost from './mission-update-post';
import SectionHeader from '../common/headers/SectionHeader';
import styles from './mission-sidebar.scss';
import moment from 'moment';

const BetweenState = ({ message }) => (
  <div className="no-mission-updates">
    <h5 className="message">{message}</h5>
  </div>
);

class MissionUpdates extends Component {
  renderResponse() {
    const { updates } = this.props;

    if(!updates) {
      return(
        <BetweenState message="fetching updates..." />
      );
    }

    if(updates.length === 0) {
      return(
        <BetweenState message="No mission control updates are available at this time." />
      );
    }

    return(
      updates.map(update => {
        if(update.author) {
          return <MissionUpdatePost update={update} key={update.uniqueId} />
        }
      })
    );

  }

  render() {
    const { updates } = this.props;

    return (
      <div className="widget-container mission-updates-widget">
        <SectionHeader title="Learn More About Telescopes"/>
        {
          this.renderResponse()
        }
      </div>
    )
  };
}

export default MissionUpdates;
