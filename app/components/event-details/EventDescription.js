import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import Heart from '../common/heart/heart';
import s from './EventDescription.scss';

const { object, func } = PropTypes;

function EventDescription({ eventContent, likeEvent, showId }) {
  const likeClass = classnames({
    clickable: eventContent.canLikeFlag
  });
  return (
    <article className={s.eventDescriptionContainer}>
      <section className={s.eventDescriptionPanel}>
        {(eventContent.mode === 'members' || eventContent.mode === 'paidmembers') &&
        <span className={s.eventDescriptionPanelItemMain}><i className="fa fa-lock icon" />Membership Required. <Link to={eventContent.registerURL} className={s.link}>Learn More.</Link></span>
        }
        <div className={s.eventDescriptionPanelItem}>
          <Heart
            className={likeClass}
            count={eventContent.likesCount}
            handleClick={() => (likeEvent({ likeId: showId }))}
            theme="dark"
          /> <span className={s.likeText}>Like </span>
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
  likeEvent: func.isRequired,
}
export default EventDescription;
