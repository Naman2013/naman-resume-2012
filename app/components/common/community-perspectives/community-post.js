import React, { PropTypes } from 'react';
import Heart from '../heart/heart';
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
}) => <div className="item">
  <div className="item-header">
    <ByUserTag
      photo={avatarURL}
      name={displayName}
      accountType={membershipType}
      memberSince={memberSince}
      location={location}
    />
    <Heart count={likesCount} />
  </div>
  <div className="description">
    <h3 className="title">
      <span dangerouslySetInnerHTML={{ __html: title }} />
    </h3>
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
