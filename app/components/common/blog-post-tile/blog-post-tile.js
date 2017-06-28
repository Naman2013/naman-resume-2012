import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './blog-post-tile.scss';

import ByUserTag from '../by-user-tag/by-user-tag';

const BlogPostTile = ({
  imageURL,
  title,
  typeIconURL,
  slugDesc,
  typeDesc,
  avatarURL,
  displayName,
  membershipType,
  memberSince,
  location,
  objectId,
  slugIconURL,
  postId
}) => {
  const postTileStyle = {
    backgroundImage: `url(${imageURL})`,
  };

  return (
    <div className="best-post col-md-6">
      <div style={postTileStyle} className="best-post-container">
        <div className="best-post-header">
          <h3 className="best-post-header-title">
            <img src={typeIconURL} width="50" alt="" /> <span dangerouslySetInnerHTML={{ __html: typeDesc }}></span>
          </h3>
        </div>
        <div className="best-post-body clearfix">

          <Link className="title-link" to={`community/post/${postId}`}>
            <h2 className="title" dangerouslySetInnerHTML={{ __html: title }}></h2>
          </Link>

          <div className="user-profile-snapshot">
            <ByUserTag
              theme={'dark'} photo={avatarURL} name={displayName}
              accountType={membershipType}
              memberSince={memberSince} location={location}
            />
            <div className="call-to-action col-md-12">
              See more about <Link className="action" to={`/objects/latest-entries/${objectId}/all`}>{slugDesc}
                <img src={slugIconURL} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPostTile.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  typeIconURL: PropTypes.string.isRequired,
  slugDesc: PropTypes.string.isRequired,
  typeDesc: PropTypes.string.isRequired,
  avatarURL: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  membershipType: PropTypes.string.isRequired,
  memberSince: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  slugIconURL: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
};

export default BlogPostTile;
