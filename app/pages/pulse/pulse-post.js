import React, { Component, PropTypes } from 'react';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import PulsePostTag from '../../components/pulse/pulse-post-tag'
import CommunityPulseTools from '../../components/community/tools/community-post-tools'
import styles from './pulse-post.scss';

class PulsePostContent extends Component {
  render() {
    const {
      post: {
        S3Files,
        postTags,
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
        likePrompt,
        showLikePrompt,
        likesCount,
        postId,
      }
    } = this.props;

    return (
      <div className={styles.PulsePostList}>

        {
          S3Files[0] ? <PulsePostImage image={S3Files[0]} imageBy={''} /> : null
        }

        <figure className={styles.PulsePostListInfo}>
          <h2 className={styles.PulsePostListInfoTitle}>
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h2>

          <div className="row">
            <div className="col-md-6">
              <ByUserTag
                theme={'light'}
                photo={avatarURL}
                name={displayName}
                accountType={membershipType}
                memberSince={memberSince}
                location={location}
              />
            </div>
            <div className="col-md-5 pull-right">
              {
                postId ?
                  <CommunityPulseTools
                    showLikePrompt={showLikePrompt}
                    likePrompt={likePrompt}
                    likesCount={likesCount}
                    likeId={postId}
                  /> : null
              }
            </div>
          </div>

          <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL} />

          <figcaption className={styles.PulsePostListInfoDesc}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </figcaption>

          {
            postTags.length > 0 ?
              <PulsePostTag tags={postTags} /> : null
          }

        </figure>
      </div>
    );
  }
}

PulsePostContent.defaultProps = {
  postTags: [],
};

export default PulsePostContent;
