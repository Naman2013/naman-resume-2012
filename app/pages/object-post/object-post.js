import React, { Component, PropTypes } from 'react';
import style from './object-post.scss';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import ObjectTitleBar from '../../components/common/headers/object-title-bar';

import ContentMainImage from '../../components/object-post/content-main-image';

class ObjectPost extends Component {
  render() {
    return(
      <div className="slooh-object-post clearfix">
        <AnnouncementBanner />
        <ObjectTitleBar />

        <div className="col-xs-8">
          <ContentMainImage
            imageSource={`foo.jpg`}
            authorName={`Sarah Blake`} />

          <h2 className="post-title">My new Gemini painting is finally finished!</h2>
        </div>

        <div className="col-xs-4">

        </div>
      </div>
    );
  }
}

export default ObjectPost;
