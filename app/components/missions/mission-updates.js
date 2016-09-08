import React, {Component, Props} from 'react';
import MissionUpdatePost from './mission-update-post';
import styles from './mission-updates.scss';

export default class MissionUpdates extends React.Component {

  render() {
    return (
      <div className="widget-container mission-updates-widget">
        <h2>Mission Control Updates</h2>
        <MissionUpdatePost />
        <MissionUpdatePost />
        <MissionUpdatePost />
        <MissionUpdatePost />
      </div>
    )
  };

}
