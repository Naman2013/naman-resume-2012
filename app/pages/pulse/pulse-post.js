import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostThumbnails from '../../components/pulse/pulse-post-image-thumbnails';
import PulsePostTag from '../../components/pulse/pulse-post-tag'
import CommunityPulseTools from '../../components/community/tools/community-post-tools'
import styles from './pulse-post.scss';

class PulsePostContent extends Component {
  render() {
    const {
      post: {
        S3Files,
        postTags,
        postId,
        title,
        excerpt,
        creationDate,
        type,
        typeIconURL,
        content,
        avatarURL,
        displayName,
        membershipType,
        memberSince,
        location,
        slug,
        customerId,
        likePrompt,
        showLikePrompt,
        likesCount,
      },
      showExcerpt
    } = this.props;

    return (
      <div className={styles.PulsePostList}>

        <figure className={styles.PulsePostListInfo}>
          <Link to={`/community/post/${postId}`}>
            <h2 className={styles.PulsePostListInfoTitle}>
              <div dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
          </Link>

          <div className="row">
            <div className="col-sm-6 col-xs-8">
              <ByUserTag
                theme={'light'}
                photo={avatarURL}
                name={displayName}
                accountType={membershipType}
                memberSince={memberSince}
                location={location}
              />
            </div>
            <div className="col-sm-5 col-xs-4 align-right">
              {
                postId ?
                  <CommunityPulseTools
                    showLikePrompt={showLikePrompt}
                    likePrompt={likePrompt}
                    likesCount={likesCount}
                    likeId={postId}
                    type={type}
                    authorId={customerId}
                    objectSlug={slug}
                  /> : null
              }
            </div>
          </div>

          <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL} />
          {
            S3Files.length > 0 ? <PulsePostThumbnails images={S3Files} /> : null
          }
          <figcaption className={styles.PulsePostListInfoDesc}>
            <div dangerouslySetInnerHTML={{ __html: showExcerpt ? excerpt : content }} />
            <div className="clearfix" />
          </figcaption>
          {
            postTags && postTags.length > 0 ?
              <PulsePostTag tags={postTags} /> : null
          }

        </figure>

        <style jsx>
          {`
            .clearfix {
              clear:both;
            }
          `}
        </style>
      </div>
    );
  }
}

PulsePostContent.defaultProps = {
  postTags: [],
  showExcerpt: false,
};

export default PulsePostContent;
