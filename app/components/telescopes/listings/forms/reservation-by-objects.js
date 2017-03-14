import React, { PropTypes } from 'react';
import ReserveByObjects from '../../../../pages/reserve/reserve-by-objects';
import Timer from './common/timer';

const ReservationByObjects = ({
  showMakeReservation,
  showPlaceOnHold,
  showCancelHold,
  expires,
  expireCallback,
  uniqueId,
  scheduledMissionId,
  missionStart,
  obsId,
  domeId,
  telescopeId,
  }) => (
    <div className="reservation-form-container">
      <Timer startTime={expires} expireCallback={expireCallback} />
      <ReserveByObjects
        resetForm={false}
        showMakeReservation={showMakeReservation}
        showPlaceOnHold={showPlaceOnHold}
        showCancelHold={showCancelHold}
        callSource={'byTelescope'}
        uniqueId={uniqueId}
        scheduledMissionId={scheduledMissionId}
        missionStart={missionStart}
        obsId={obsId}
        domeId={domeId}
        telescopeId={telescopeId}
      />
    </div>
  );

ReservationByObjects.defaultProps = {
  showMakeReservation: true,
  showPlaceOnHold: true,
  showCancelHold: false,
};

const { string, number, bool, func } = PropTypes;
ReservationByObjects.propTypes = {
  showMakeReservation: bool,
  showPlaceOnHold: bool,
  showCancelHold: bool,
  expires: number.isRequired,
  expireCallback: func.isRequired,
  uniqueId: string.isRequired,
  scheduledMissionId: number.isRequired,
  missionStart: number.isRequired,
  obsId: string.isRequired,
  domeId: number.isRequired,
  telescopeId: string.isRequired,
};

export default ReservationByObjects;
