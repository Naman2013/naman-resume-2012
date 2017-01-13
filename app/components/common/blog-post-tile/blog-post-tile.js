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
  slugIconURL
}) => {
  const postTileStyle = {
    backgroundImage: `url(${imageURL})`,
  };
  return (
    <div className="best-post col-md-6">
      <div style={postTileStyle} className="best-post-container">
        <div className="best-post-header">
          <h3 className="best-post-header-title">
            <img src={typeIconURL} width="50" alt="" /> {typeDesc}
          </h3>
        </div>
        <div className="best-post-body clearfix">
          <h2 className="title">
            <div dangerouslySetInnerHTML={{ __html: title }} />
          </h2>
          <div className="user-profile-snapshot">
            <ByUserTag
              theme={'dark'} photo={avatarURL} name={displayName}
              accountType={membershipType}
              memberSince={memberSince} location={location}
            />
            <div className="call-to-action col-md-12">
              See more about <Link className="action" to="">{slugDesc}
                <img src={slugIconURL} alt="" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BlogPostTile.propTypes = {
  topic: PropTypes.string,
  topicSymbol: PropTypes.string,
  title: PropTypes.string,
  coverPhoto: PropTypes.string,
  user: PropTypes.object,
};

export default BlogPostTile;
