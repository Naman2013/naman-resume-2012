import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import s from './style/community-header-banner.scss';


const CommunityPostHeader = ({ titleText, objectIconURL, showCreateNewPostButton, errorOccurred }) =>
  <div className={s.communityPostHeader}>

    <div className="title">
      {
        (objectIconURL && !errorOccurred) ? <img alt="Object icon" src={objectIconURL} height="55" /> : null
      }
      <h1>{!errorOccurred ? titleText : ''}</h1>
    </div>

    <div className="additional">
      <div className="button-nav">
        <Link className="button btn-primary" to="/reservations/slooh-recommends/">Reserve Telescope</Link>
        {
          showCreateNewPostButton ? <Link className="button btn-primary" to="/publish-post">Create New Post</Link> : null
        }
      </div>
    </div>

  </div>;

CommunityPostHeader.propTypes = {
  errorOccurred: PropTypes.bool,
  titleText: PropTypes.string.isRequired,
  objectIconURL: PropTypes.string.isRequired,
  showCreateNewPostButton: PropTypes.bool,
};

CommunityPostHeader.defaultProps = {
  errorOccurred: false,
  showCreateNewPostButton: false,
};

export default CommunityPostHeader;
