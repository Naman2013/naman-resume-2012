import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import Heart from '../../components/common/heart/heart'
import styles from './pulse-post.scss';

const PulsePostItem =
  ({ S3Files, postId, postTitle, creationDate, type, typeIconURL, content, avatarURL, displayName, membershipType, memberSince, location, likesCount }) =>
    
    <div className={styles.PulsePostList}>
      
      <PulsePostImage image={S3Files[0]} imageBy={""}/>
      
      <figure className={styles.PulsePostListInfo}>
        <Link to={`slooh-pulse/post/${postId}`}><h2 className={styles.PulsePostListInfoTitle}>{postTitle}</h2>
        </Link>
        
        <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL}/>
        
        <figcaption className={styles.PulsePostListInfoDesc}>
          {content} ... (<Link to={"#"}>See full entry</Link>)
        </figcaption>
        
        <div className="row flex-center">
          <div className="col-md-11">
            <ByUserTag photo={avatarURL} name={displayName} accountType={membershipType}
                       memberSince={memberSince} location={location}/>
          </div>
          
          <div className={`col-md-1`}>
            <Heart count={likesCount}/>
          </div>
        </div>
      </figure>
      
      <hr/>
    </div>;

export default PulsePostItem;
