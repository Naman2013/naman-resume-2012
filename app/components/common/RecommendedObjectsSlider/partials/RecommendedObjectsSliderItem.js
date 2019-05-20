import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Button from '../../style/buttons/Button';

import styles from './RecommendedObjectsSliderItem.style';
import messages from './RecommendedObjectsSliderItem.messages';

const getIconStyle = iconURL => ({
  backgroundImage: `url(${iconURL})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});

const { string, arrayOf, shape, bool } = PropTypes;

const RecommendedObjectsItem = ({ object, intl, reservationModalShow }) => {
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
        <div className="object-field details">{telescopeName}</div>
      </div>
      {missionAvailable && !userHasReservation && (
        <Button
          onClickEvent={() => reservationModalShow(object)}
          text={intl.formatMessage(messages.Options)}
          theme={{ margin: '30px auto 0', width: '140px' }}
        />
      )}
      <style jsx>{styles}</style>
    </div>
  );
};

RecommendedObjectsItem.propTypes = {
  intl: shape({}).isRequired,
};

export default injectIntl(RecommendedObjectsItem);
