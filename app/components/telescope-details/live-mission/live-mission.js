import React, { Component, PropTypes } from 'react';
import Heart from  '../../common/heart/heart';
import classnames from 'classnames';
import './live-mission.scss';

class LiveMission extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      classes: []
    };
  };

  render() {
    return(
      <div className="live-mission">
        <div className="content">
          <div className="top">
            <h3>CURRENT LIVE MISSION:</h3>
            <p>Andromeda Galaxy (M31)</p>
          </div>
          <div className="personal-info">
            <p className="name">Dave Eberly</p>
            <p className="job">ASTRONOMER</p>
            <p className="address">Chicago, IL, USA. Member since 2011</p>
            <p className="description">“Always wanted to get a shot of this amazing galaxy since I was a kid seeing a light smear back in Kansas.”</p>
            <img src={'/assets/images/graphics/dave-photo.png'} className="photo" />
          </div>

          <Heart count={`122`} />

        </div>
        <div className="footer">
          <p>NEXT MISSION:</p>
          <div className="mission">
            <img src={'/assets/images/icons/icon-planet.png'} />
            <p>Counting Saturn’s Moons</p>
            <span>in 3:18</span>
          </div>
        </div>
        <div className="heart hide">122</div>
      </div>
    );
  }
}

export default LiveMission;
