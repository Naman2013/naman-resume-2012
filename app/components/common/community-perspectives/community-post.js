import React, { Component, PropTypes } from 'react';
import Heart from '../heart/heart';

/**
  TODO: need to display user profile information
  add new props and place them here...
*/

class CommunityPost extends Component {
  render() {
    return(
      <div className="item">
        <div className="personal-info">
          <div className="clearfix">
            <p className="name">Dave Eberly <span className="job">Astronomer</span></p>
          </div>
          <p className="address">Chicago, IL, USA. Member since 2011</p>
          <img src={'assets/images/graphics/dave-photo.png'} className="photo" />
        </div>

        <div className="description">
          <h3 className="title">
            Some cool stats on Andromeda Being
          </h3>
          <div className="desc">
            <p>Approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies. The light you see has taken 2 million years to get to the earth!</p>
            <p>Approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies. The light you see has taken 2 million years to get to the earth!</p>
            <p>Approximately 220,000 light years across, it is the largest galaxy of the Local Group, which also contains the Milky Way, the Triangulum Galaxy, and about 44 other smaller galaxies. The light you see has taken 2 million years to get to the earth!</p>
          </div>
        </div>

        <div className="share-options-container">
          <Heart />
        </div>
      </div>
    );
  }
}

CommunityPost.defaultProps = {
  content: '',
  title: '',
};

CommunityPost.PropTypes = {
  content: PropTypes.string,
  title: PropTypes.string,
};

export default CommunityPost;
