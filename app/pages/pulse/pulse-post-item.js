import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import Heart from '../../components/common/heart/heart'
import styles from './pulse-post.scss';

const PulsePostItem = ({
  S3Files,
  postId,
  title,
  creationDate,
  type,
  typeIconURL,
  content,
  avatarURL,
  displayName,
  membershipType,
  memberSince,
  location,
  likesCount }) => (
    <div>
      <div className={styles.PulsePostList}>
        {
          S3Files[0] ? <PulsePostImage image={S3Files[0]} imageBy={''} /> : null
        }

        <figure className={styles.PulsePostListInfo}>
          <Link to={`community/post/${postId}`}>
            <h2 className={styles.PulsePostListInfoTitle}>
              <div dangerouslySetInnerHTML={{__html: title}} />
            </h2>
          </Link>

          <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL}/>

          <figcaption className={styles.PulsePostListInfoDesc}>
            <div dangerouslySetInnerHTML={{ __html: content }} />  ... (<Link to={`/community/post/${postId}`}>See full entry</Link>)
          </figcaption>

          <div className="row flex-center">
            <div className="col-md-11">
              <ByUserTag
                theme="light"
                photo={avatarURL}
                name={displayName}
                accountType={membershipType}
                memberSince={memberSince}
                location={location}
              />
            </div>

            <div className="col-md-1">
              <Heart
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
