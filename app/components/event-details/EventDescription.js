import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Heart from '../common/heart/heart';
import SocialSharingBar from '../common/social-sharing-bar/SocialSharingBar';
import like from '../../services/events/like';
import purgeHashURL from '../../utils/purgeHashURL';
import s from './EventDescription.scss';

const socialSharingInlineStyle = {
  display: 'block',
  marginTop: '2em',
  marginLeft: '0.25em',
}

function EventDescription({ socialSharePageURL, eventContent, showId }) {
  var encodeurl = require('encodeurl');
  var base64 = require('base-64');

  const socialShareTitle = encodeurl(base64.encode(eventContent.title));

  var completeShareURL = socialSharePageURL +
    "?title=" + socialShareTitle +
    "&pagetype=article" +
    "&description=" + encodeurl(base64.encode(eventContent.socialShareDescription)) +
    "&shareURL=" + encodeurl(base64.encode(eventContent.eventFullURL)) +
    "&imageURL=" + encodeurl(base64.encode(eventContent.featuredImageURL));

  return (
    <article className={s.eventDescriptionContainer}>
      <section className={`${s.eventDescriptionPanel} clearfix`}>
        {
          (eventContent.mode === 'members' || eventContent.mode === 'paidmembers') &&
          <span className={s.eventDescriptionPanelItemMain}>
            <i className="fa fa-lock icon" />Membership Required. <a href={purgeHashURL(eventContent.registerURL)} className={s.link}>Learn More</a>
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

          <div style={socialSharingInlineStyle}>
            <SocialSharingBar
                contentLayout="horizontal"
                shareTitle={eventContent.title}
                shareDescription={eventContent.socialShareDescription}
                shareURL={completeShareURL}
                shareImageURL={eventContent.featuredImageURL}
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
