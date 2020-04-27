import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { MissionsDaySelector } from '../missions-day-selector';
import { MissionTimeSlot } from '../mission-time-slot';
import './styles.scss';

export class MissionsList extends Component {
  selectDate = date => {
    const { getMissionSlotDates } = this.props;
    getMissionSlotDates(date);
  };

  render() {
    const {
      selectedDate,
      missionList,
      getTelescopeSlot,
      showDateArrows,
      showShowMoreButton,
      showMoreButtonCaption,
      showMore,
      getMissionSlots,
      grabPiggyback,
      editCoordinates,
      locked
    } = this.props;

    return (
      <div className="missions-list">
        <MissionsDaySelector
          selectedDate={selectedDate}
          selectDate={this.selectDate}
          showDateArrows={showDateArrows}
        />

        {missionList &&
          missionList.length > 0 &&
          missionList.map(item => (
            <MissionTimeSlot
              key={item.scheduledMissionId}
              timeSlot={item}
              getTelescopeSlot={finalizeReservation =>
                getTelescopeSlot(item, finalizeReservation)
              }
              getMissionSlots={getMissionSlots}
              grabPiggyback={grabPiggyback}
              editCoordinates={editCoordinates}
              locked={locked}
            />
          ))}

        {showShowMoreButton && (
          <Button className="show-more" onClick={showMore}>
            {showMoreButtonCaption}
          </Button>
        )}
      </div>
    );
  }
}
