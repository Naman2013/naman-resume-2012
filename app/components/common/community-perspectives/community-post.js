import React, { PropTypes } from 'react';
import Heart from '../heart/heart';
import { Link } from 'react-router';
import ByUserTag from '../by-user-tag/by-user-tag';

const CommunityPost = ({
  content,
  title,
  displayName,
  location,
  membershipType,
  memberSince,
  avatarURL,
  likesCount,
  postId,
}) => <div className="item">
  <div className="item-header">
    <ByUserTag
      photo={avatarURL}
      name={displayName}
      accountType={membershipType}
      memberSince={memberSince}
      location={location}
    />
  <Heart count={likesCount} likeId={postId} canLikeFlag={false} />
  </div>
  <div className="description">
    <Link className="descriptionLink" to={`/community/post/${postId}`}>
      <h3 className="title">
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </h3>
    </Link>
    <div className="desc">
      <p dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </div>

  {
    /**
     coming soon...
     <div className="share-options-container">
     <Heart />
     </div>
     */
  }
</div>;

const { string, bool } = PropTypes;
CommunityPost.PropTypes = {
  content: string.isRequired,
  title: string.isRequired,
  displayName: string.isRequired,
  location: string.isRequired,
  membershipType: string.isRequired,
  memberSince: string.isRequired,
  avatarURL: string.isRequired,
  likesCount: bool,
};

export default CommunityPost;
