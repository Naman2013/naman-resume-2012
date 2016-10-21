import React, { Component, PropTypes } from 'react';
import style from './object-post.scss';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import ObjectTitleBar from '../../components/common/headers/object-title-bar';

class ObjectPost extends Component {
  render() {
    return(
      <div className="slooh-object-post">
        <AnnouncementBanner />
        <ObjectTitleBar />
      </div>
    );
  }
}

export default ObjectPost;
