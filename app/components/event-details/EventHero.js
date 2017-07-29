import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from 'react-router';
import purgeHashURL from '../../utils/purgeHashURL';
import s from './EventHero.scss';

const { object } = PropTypes;

function EventHero({ eventContent }) {
  const getHeroInlineStyle = imgUrl => ({
    backgroundImage: `url(${imgUrl})`,
  });

  const eventStart = moment.tz(eventContent.startDate * 1000, 'America/New_York').format('dddd, MMMM D, YYYY h:mmA z');
  const sponsorInfo = eventContent.sponsorInformation || {};

  return (
    <div style={getHeroInlineStyle(eventContent.featuredImageURL)} className={s.eventHeroRoot}>
      <header className={s.titleContainer}>
        <h2
          className={s.topTitle}
          dangerouslySetInnerHTML={{ __html: eventContent.topTitle }}
        />
      </header>

      <article className={s.eventDetailsContainer}>
        <h1 className={s.title}>
          <span dangerouslySetInnerHTML={{ __html: eventContent.title }} />
        </h1>
        <h3 className={s.eventTimeData}>
          {eventStart}
        </h3>
      </article>

      {
        !!sponsorInfo.SponsorFlag &&
        <div className={s.sponsorBy}>Sponsored By:
          <a href={sponsorInfo.SponsorLinkURL} rel="noopener noreferrer" target="_blank">
            <img alt="Sponsored by logo" src={sponsorInfo.SponsorLogoURL} className={s.sponsorLogo} />
          </a>
        </div>
      }

      {
        eventContent.showLink &&
        <Link
          to={purgeHashURL(eventContent.showLink)}
          className="btn btn-primary"
          dangerouslySetInnerHTML={{ __html: eventContent.showLinkText }}
        />
      }

    </div>
  );
}

EventHero.propTypes = {
  eventContent: object.isRequired,
}
export default EventHero;
