import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
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
        <h2 className={s.topTitle} dangerouslySetInnerHTML={{ __html: eventContent.topTitle }} />
      </header>

      <article className={s.eventDetailsContainer}>
        <h1 className={s.title}>
          <span dangerouslySetInnerHTML={{ __html: eventContent.title }}></span>
        </h1>
        <h3 className={s.eventTimeData}>
          {eventStart}
        </h3>
      </article>

      {!!sponsorInfo.SponsorFlag &&
        <div className={s.sponsorBy}>Sponsored By:
          <a href={sponsorInfo.SponsorLinkURL} target="_blank">
            <img src={sponsorInfo.SponsorLogoURL} className={s.sponsorLogo} />
          </a>
        </div>
      }

      {eventContent.showLink && <a href={eventContent.showLink} className="btn btn-primary" dangerouslySetInnerHTML={{ __html: eventContent.showLinkText }}></a>}

    </div>
  );
}

EventHero.propTypes = {
  eventContent: object.isRequired,
}
export default EventHero;
