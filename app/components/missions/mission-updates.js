import React, { Component, Props } from 'react';
import MissionUpdatePost from './mission-update-post';
import styles from './mission-sidebar.scss';
import moment from 'moment';

class MissionUpdates extends Component {

  render() {
    return (
      <div className="widget-container mission-updates-widget">
        <h2 className="title">Mission Control Updates</h2>

        {
          this.props.updates ? this.props.updates.map(update => {
            if(update.author) {
              return <MissionUpdatePost update={update} key={update.uniqueId} />
            }
          }) : 'waiting...'
        }
      </div>
    )
  };
}

export default MissionUpdates;
