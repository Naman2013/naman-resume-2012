import React, {Component, Props} from 'react';
import MissionUpdatePost from './mission-update-post';
import styles from './mission-sidebar.scss';
import moment from 'moment';

export default class MissionUpdates extends React.Component {

  render() {
    return (
      <div className="widget-container mission-updates-widget">
        <h2>Mission Control Updates</h2>

        {this.props.updates ? this.props.updates.map(update => {
          const currentTime = moment().unix();
          // TODO: add expiration check below `currentTime > update.end`
          if(update.author) {
            return <MissionUpdatePost update={update} key={update.uniqueId} />
          }
        }) : 'waiting...'}
      </div>
    )
  };

}
