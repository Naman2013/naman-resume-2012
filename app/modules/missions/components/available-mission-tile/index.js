import React, { Component } from 'react';
import Button from '../../../../components/common/style/buttons/Button';
import './styles.scss';

export class AvailbleMissionTile extends Component {
  render() {
    const {
      title,
      time,
      description,
      date,
      telescope,
      scheduleMission,
      cancel,
    } = this.props;

    return (
      <div className="mission-tile">
        <h5 className="title">{title}</h5>
        <div className="time">{time}</div>
        <div className="info">
          <div className="date">{date}</div>
          <div className="telescope">{telescope}</div>
        </div>
        <div className="description">{description}</div>
        <div className="actions">
          <Button
            onClickEvent={cancel}
            theme={{ borderRadius: '50%' }}
            renderIcon={() => <div className="mission-tile-icon fa fa-close" />}
          />
          <Button text="Schedule Mission" onClickEvent={scheduleMission} />
        </div>
      </div>
    );
  }
}
