import React, { Component } from 'react';
import AnnouncementBanner from '../../components/common/announcement-banner/announcement-banner'
import CallToAction from '../../components/publish-post/call-to-action';
import SelectContentCategory from '../../components/publish-post/select-content-category';
import style from './publish-post.scss';

class PublishPost extends Component {
  render() {
    return (
      <div>
        <AnnouncementBanner />

        <CallToAction />

        <ul className="publish-post-list">
          <li className="item">
            <span className="number">1</span>
            <p className="description">Select a Content Category</p>

            <SelectContentCategory />
          </li>
        </ul>
      </div>
    )
  }
}

export default PublishPost;
