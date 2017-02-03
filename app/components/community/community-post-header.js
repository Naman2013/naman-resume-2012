import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { iconPlanet as icon } from './tools/community-icon';
import styles from './style/community-header-banner.scss';


const CommunityPostHeader = (list) =>
  <div className={styles.communityPostHeader}>

    <div className="title">
      {icon[list.icon]} <h1>{list.name} </h1>
    </div>

    <div className="additional">
      <div className="button-nav">
        <Link className="button btn-primary" to="/reservations/slooh-recommends/">Reserve Telescope</Link>
        <Link className="button btn-primary" to="/publish-post">Create New Post</Link>
      </div>
    </div>

  </div>;

export default CommunityPostHeader;

CommunityPostHeader.propTypes = {
  list: PropTypes.object
};
