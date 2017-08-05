import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import Heart from '../../components/common/heart/heart'
import styles from './pulse-post.scss';

const PulsePostItem = ({
  customerId,
  S3Files,
  postId,
  slug,
  title,
  creationDate,
  excerpt,
  type,
  typeIconURL,
  content,
  avatarURL,
  displayName,
  membershipType,
  memberSince,
  location,
  likePrompt,
  showLikePrompt,
  likesCount }) => (
    <div>
      <div className={styles.PulsePostList}>
        {
          S3Files[0] ? <PulsePostImage image={S3Files[0]} imageBy={''} /> : null
        }

        <figure className={styles.PulsePostListInfo}>
          <Link to={`/community/post/${postId}`}>
            <h2 className={styles.PulsePostListInfoTitle}>
              <div dangerouslySetInnerHTML={{__html: title}} />
            </h2>
          </Link>

          <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL}/>

          <figcaption className={styles.PulsePostListInfoDesc}>
            <div dangerouslySetInnerHTML={{ __html: excerpt }} />(<Link to={`/community/post/${postId}`}>See full entry</Link>)
          </figcaption>

          <div className="row">
            <div className="col-sm-8">
              <ByUserTag
                theme="light"
                photo={avatarURL}
                name={displayName}
                accountType={membershipType}
                memberSince={memberSince}
                location={location}
              />
            </div>

            <div className="col-sm-4">
              <Heart
                type={type}
                authorId={customerId}
                objectSlug={slug}
                membershipType={membershipType}
                showLikePrompt={showLikePrompt}
                likePrompt={likePrompt}
                count={likesCount}
                likeId={postId}
                theme="dark"
              />
            </div>
          </div>
        </figure>

        <hr/>
      </div>
    </div>
  );

export default PulsePostItem;
