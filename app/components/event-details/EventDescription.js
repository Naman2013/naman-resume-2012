import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Heart from '../common/heart/heart';
import like from '../../services/events/like';
import purgeHashURL from '../../utils/purgeHashURL';
import s from './EventDescription.scss';

function EventDescription({ eventContent, showId }) {
  return (
    <article className={s.eventDescriptionContainer}>
      <section className={`${s.eventDescriptionPanel} clearfix`}>
        {
          (eventContent.mode === 'members' || eventContent.mode === 'paidmembers') &&
          <span className={s.eventDescriptionPanelItemMain}>
            <i className="fa fa-lock icon" />Membership Required. <Link to={purgeHashURL(eventContent.registerURL)} className={s.link}>Learn More</Link>
          </span>
        }
        <div className={s.sharingOptionsMenu}>
          <div className={s.eventDescriptionPanelItem}>
            <Heart
              membershipType={eventContent.membershipType}
              showLikePrompt={eventContent.showLikePrompt}
              likePrompt={eventContent.likePrompt}
              count={eventContent.likesCount}
              canLikeFlag={eventContent.canLikeFlag}
              likeAction={like}
              likeId={showId}
              theme="dark"
            />
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
  eventContent: PropTypes.object.isRequired,
};

export default EventDescription;
