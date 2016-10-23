import React, { Component, PropTypes } from 'react';
import style from './object-post.scss';

import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner';
import ObjectTitleBar from '../../components/common/headers/object-title-bar';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag';

import ContentMainImage from '../../components/object-post/content-main-image';

class ObjectPost extends Component {
  render() {
    return(
      <div className="slooh-object-post clearfix">
        <AnnouncementBanner obsId={`teide`} />

        <ObjectTitleBar />

        { /* left column */ }
        <div className="col-xs-8">

          <ContentMainImage
            imageSource={`foo.jpg`}
            authorName={`Sarah Blake`} />

          <h2 className="post-title">My new Gemini painting is finally finished!</h2>

          <div className="col-xs-6">
            <ByUserTag theme={`light`} />
          </div>

        </div>


        { /* right column */ }
        <div className="col-xs-4">

        </div>
      </div>
    );
  }
}

export default ObjectPost;
