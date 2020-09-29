import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../style/buttons/Button';
import { Tooltip } from 'react-tippy';
import styles from './RecommendedObjectsSliderItem.style';

const getIconStyle = iconURL => ({
  backgroundImage: `url(${iconURL})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const { string, arrayOf, shape, bool } = PropTypes;

const RecommendedObjectsItem = ({
  object,
  reservationModalShow,
  reservedButtonCaption,
  optionsButtonCaption,
  readOnly,  
}) => {
  const {
    missionStartFormatted,
    title,
    calendarIconURL,
    clockIconURL,
    observatoryIconURL,
    objectIconURL,
    telescopeName,
    missionAvailable,
    userHasReservation,
    showJoiningMission,
    joiningMissionTooltipText,
    joiningMissionIconURL,
    joinButtonCaption,
    showJoinButton,
  } = object;
  const {
    displayWeekdayMonthDayYearUTC,
    displayTime,
    displayTimeZone,
  } = missionStartFormatted;
 
  return (
    <div className="card-object">
      <div className="object-icon">
        {objectIconURL ? <div style={getIconStyle(objectIconURL)} /> : null}
      </div>
      <div
        className="object-field title"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="field-wrapper">
        <img src={calendarIconURL} alt="icon" />
        <div className="object-field details">
          {displayWeekdayMonthDayYearUTC}
        </div>
      </div>
      <div className="field-wrapper">
        <img src={clockIconURL} alt="icon" />
        <div className="object-field details">{`${displayTime} ${displayTimeZone}`}</div>
      </div>
      <div className="field-wrapper">
        <img src={observatoryIconURL} alt="icon" />
        <div className="object-field details telescope-name-container">
          <div className="telescope-name">{telescopeName}</div>
        </div>
      </div>
      <div className="center-div">
      {missionAvailable && !userHasReservation && !readOnly && showJoinButton && [(
        <Button
          onClickEvent={() => reservationModalShow(object)}
          text={joinButtonCaption}
          theme={{ margin: '30px auto 0', width: '140px', display: 'inline-flex' }}
        />),
        (showJoiningMission ? ( 
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon-right" src={joiningMissionIconURL} />
              </Tooltip>) : null)
      ]}
      </div>
      {userHasReservation && reservedButtonCaption && (
        <div className="reserved-mission-capture">
          {/* {reservedButtonCaption} */}
          {showJoiningMission ? ( 
              <Tooltip
              className="mission-tooltip"
              title={joiningMissionTooltipText}
              position="top"
              theme="light">
                  <img alt="" className="mission-icon" src={joiningMissionIconURL} />
              </Tooltip>) : null}
          </div>
      )}
      <style jsx>{styles}</style>
    </div>
  );
};

export default RecommendedObjectsItem;
