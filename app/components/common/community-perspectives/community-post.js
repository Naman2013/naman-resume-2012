import React, { Component, PropTypes } from 'react';
import Heart from '../heart/heart';
import ByUserTag from '../by-user-tag/by-user-tag';

class CommunityPost extends Component {
  render() {
    const {
      content,
      slug,
      tags,
      displayName,
      location,
      membershipType,
      memberSince,
      avatarURL } = this.props;

    const title = tags[0].title;

    return(
      <div className="item">

        <ByUserTag
          photo={avatarURL}
          name={displayName}
          accountType={membershipType}
          memberSince={memberSince}
          location={location}
        />

        <div className="description">
          <h3 className="title">
            <span dangerouslySetInnerHTML={{__html: title}}></span>
          </h3>
          <div className="desc">
            <p dangerouslySetInnerHTML={{__html: content}}></p>
          </div>
        </div>

        {
          /**
           coming soon...
           <div className="share-options-container">
             <Heart />
           </div>
          */
        }
      </div>
    );
  }
}

CommunityPost.defaultProps = {
  content: '',
  title: '',
};

const { string, number, bool, arrayOf, shape } = PropTypes;
CommunityPost.PropTypes = {
  content: string.isRequired,
  slug: string.isRequired,
  tags: arrayOf(shape({
    title: string.isRequired,
  })),

  displayName: string.isRequired,
  location: string.isRequired,
  membershipType: string.isRequired,
  memberSince: string.isRequired,
  avatarURL: string.isRequired,
};

export default CommunityPost;
