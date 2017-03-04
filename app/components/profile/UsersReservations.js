import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment-timezone';
import classnames from 'classnames';
import InlineDaysCountdown from '../../components/common/inline-countdown/inline-days-countdown';
import s from './UsersReservations.scss';

const { array, func } = PropTypes;
const dateFormats = (unixTimestamp) => {
  const formattedUTCDate = new Date(unixTimestamp * 1000);
  return {
    estStart: moment.tz(formattedUTCDate, 'America/New_York').format('MMMM D YYYY'),
    estStartTime: moment.tz(formattedUTCDate, 'America/New_York').format('h:mma z'),
    pstStartTime: moment.tz(formattedUTCDate, 'America/Los_Angeles').format('h:mma z'),
    utcStartTime: moment.utc(formattedUTCDate).format('HH:mm z'),
  };
};

const UsersReservations = ({ reservationsList, refreshAction }) => {
  return (
    <div>
      {reservationsList.map((reservation) => {
        const { estStart, estStartTime, pstStartTime, utcStartTime } = dateFormats(reservation.missionStart);
        const countdownClass = classnames({
          hidden: !reservation.showCountdownToMission,
        });
        return (
          <article
            className={`card-xwide sans-serif ${s.UsersReservations}`}
            key={reservation.scheduledMissionId}
          >

            <section className="col-3fourth border-right padding-top-xxsmall padding-bottom-small padding-left-med">
              <header className="padding-bottom-xxsmall">
                <h3>
                  <img className={s.missionIcon} src={reservation.missionIconURL} />
                  <span
                    dangerouslySetInnerHTML={{ __html: reservation.missionTitle }}
                  />
                </h3>
              </header>

              <section className="row-page margin-top-xxsmall margin-bottom-xsmall sans-serif border-bottom border-top padding-none">
                <div className="col-third padding-small padding-bottom-xxsmall mission-type">
                  <p className="text-small">
                  <span
                    dangerouslySetInnerHTML={{ __html: reservation.missionType }}
                  />
                  </p>
                </div>
                <div className="col-third border-left border-right padding-small padding-bottom-xxsmall mission-location">
                  <p className="icon-small icon-location text-small">
                  <Link
                    to={`telescope-overview/${reservation.observatoryUniqueId}`}
                    className="icon-small icon-telescope text-small"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: reservation.missionLocation }}
                    />
                  </Link>
                  </p>
                </div>
                <div className="col-third padding-small padding-bottom-xxsmall padding-left-none mission-telescope-name">
                  <Link
                    to={`telescope-details/${reservation.observatoryUniqueId}/${reservation.telescopeUniqueId}`}
                    className="icon-small icon-telescope text-small"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: reservation.telescopePierName }}
                    />
                  </Link>
                </div>
              </section>
              <section className="row-xxwide sans-serif">
                <div className="date-time">
                  <span className="icon-small icon-calendar" /> <span className="padding-right-xsmall margin-right-xsmall">{estStart}</span>
                  <span><strong>{estStartTime}</strong></span>
                  <span className="padding-right-xsmall padding-left-xsmall margin-left-xsmall margin-right-xsmall border-right border-left"><strong>{pstStartTime}</strong> </span>
                  <span><strong>{utcStartTime}</strong></span>
                </div>
              </section>
            </section>

            <aside className="col-quarter padding-top-large padding-left-med padding-right-med center-center">
              <figure>
                <div>
                  {/* we want to render the inline countdown if it has a mission start time
                    so we can use InlineDaysCountdown's exitAction logic to fire the refresh action when
                    we have reached the mission start time. However, we only want to show the countdown
                    to the user if the showCountdownToMission flag is set to true which is why we are doing a display:none
                  */}
                  {reservation.expires > 0 && <div className={countdownClass}>
                    <div className="dhm-label">
                      <span className="padding-none padding-right-med border-right">D</span>
                      <span className="padding-none padding-right-reg padding-left-reg border-none">H</span>
                      <span className="padding-none padding-left-med  border-left">M</span>
                    </div>

                    <section className="dhm text-xxlarge"><InlineDaysCountdown startTime={reservation.expires} exitAction={refreshAction} /></section>
                  </div>}
                  {(reservation.showMissionResultIcon || reservation.showMissionInProgress) && <img className={s.missionIconXtraLarge} src={reservation.missionResultIconURL} />}
                </div>

                <figcaption className="padding-top-xxsmall">
                  <span
                    dangerouslySetInnerHTML={{ __html: reservation.missionExplanation }}
                  />
                </figcaption>
              </figure>
            </aside>
          </article>
        );
      })}
    </div>
  );
};

UsersReservations.defaultProps = {
  reservationsList: [],
};

UsersReservations.propTypes = {
  reservationsList: array,
  refreshAction: func.isRequired,
};

export default UsersReservations;
