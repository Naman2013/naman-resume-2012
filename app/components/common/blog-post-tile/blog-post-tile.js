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

          <div className="tile-body">
            <h2 className="title">{title}</h2>

            <div className="user-profile-snapshot">
              <div className="col-md-2">
                <img src={user.photo} />
              </div>

              <div className="col-md-10">
                <h4 className="username">
                  {user.name} <span className="account-level">${user.accountType}</span>
                </h4>
              </div>

              <div>
                See more about <Link to="">{relatedObject} <img src={relatedObjectIcon} width="30" /></Link>
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
