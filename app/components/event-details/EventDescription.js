import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Heart from '../common/heart/heart';
import s from './EventDescription.scss';

const { object, func } = PropTypes;

function EventDescription({ eventContent, showId }) {
  return (
    <article className={s.eventDescriptionContainer}>
      <section className={`${s.eventDescriptionPanel} clearfix`}>
        {
          (eventContent.mode === 'members' || eventContent.mode === 'paidmembers') &&
          <span className={s.eventDescriptionPanelItemMain}>
            <i className="fa fa-lock icon" />Membership Required. <a href={eventContent.registerURL} className={s.link}>Learn More.</a>
          </span>
        }
        <div className={s.sharingOptionsMenu}>
          <div className={s.eventDescriptionPanelItem}>
            {
              /**
                TODO: bring this back once we know how to handle the API properties for liking an event
                <Heart
                  count={eventContent.likesCount}
                  likeId={showId}
                  theme="dark"
                /> <span className={s.likeText}>Like </span>
                */
            }
          </div>
        </div>
      </section>
      <section className={s.eventDescriptionContent}>
        <div dangerouslySetInnerHTML={{ __html: eventContent.content }} />
      </section>
    </article>
  );
}

EventDescription.propTypes = {
  eventContent: object.isRequired,
}
export default EventDescription;
