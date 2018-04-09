import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Heart from '../heart/heart';
import ByUserTag from '../by-user-tag/by-user-tag';

const CommunityPost = ({
  content,
  canLikeFlag,
  title,
  displayName,
  location,
  membershipType,
  memberSince,
  avatarURL,
  likesCount,
  type,
  customerId,
  slug,
  showLikePrompt,
  likePrompt,
  postId,
}) => (
  <div className="item">
    <div className="item-header">
      <ByUserTag
        photo={avatarURL}
        name={displayName}
        accountType={membershipType}
        memberSince={memberSince}
        location={location}
      />
      <Heart
        type={type}
        authorId={customerId}
        objectSlug={slug}
        count={likesCount}
        likeId={postId}
        canLikeFlag={canLikeFlag}
        likePrompt={likePrompt}
        showLikePrompt={showLikePrompt}
      />
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
  </div>
);

const { string, bool } = PropTypes;
CommunityPost.propTypes = {
  content: string.isRequired,
  title: string.isRequired,
  displayName: string.isRequired,
  location: string.isRequired,
  membershipType: string.isRequired,
  memberSince: string.isRequired,
  avatarURL: string.isRequired,
  likesCount: bool,
  showLikePrompt: bool,
  likePrompt: string,
};

export default CommunityPost;
