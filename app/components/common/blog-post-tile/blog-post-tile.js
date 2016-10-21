import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './blog-post-tile.scss';

const BlogPostTile = ({
  topic,
  topicSymbol,
  title,
  coverPhoto,
  relatedObject,
  relatedObjectUniqueId,
  relatedObjectIcon,
  user }) => {

  const postTileStyle = {
    backgroundImage: `url(${coverPhoto})`,
  };

  return (
    <div
      className="slooh-blog-post-tile col-md-6">

        <div
          style={postTileStyle}
          className="tile-content-container">

          <div className="topic-heading">
            <h3 className="title">
              <img src={topicSymbol} width="50" /> {topic}
            </h3>
          </div>

          <div className="tile-body clearfix">
            <h2 className="title">{title}</h2>


            <div className="user-profile-snapshot">
              <UserProfileSnapshot version={`dark`} />

              <div className="call-to-action col-md-12">
                See more about <Link className="action" to="">{relatedObject} <img src={relatedObjectIcon} width="30" /></Link>
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
