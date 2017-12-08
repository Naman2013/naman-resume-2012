import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExploreSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="explorespace-container">
        <h1>Explore</h1>
        <div className="explorespace-container-overlay">
          <div className="explorespace-container-overlayimage"/>
          <div className="explorespace-sphereimage">
            hello
            <img src="../../../assets/images/welcome/Spheres.png"/>
          </div>
        </div>

        <style jsx>{`
          .explorespace-container {
            background: url("../../../assets/images/welcome/StarryNight_Dark.png") no-repeat center center;
            min-height: 768px;
            height: 768px;
            z-index: 0;
            position: relative;
            display: block;
          }

          .explorespace-container-overlay {
            position: absolute;
            left: 0;
            bottom: 0;
            min-height: 583px;
            min-width: 100%;
            display: inline-block;
          }

          .explorespace-container-overlayimage {
            background: transparent url("../../../assets/images/welcome/Overlay.png") no-repeat bottom center;
            min-height: 583px;
            min-width: 100%;
            opacity: 0.2;
            z-index: 2;
            display: inline-block;
          }

          .explorespace-sphereimage {
            z-index: 3;
            margin-left: auto;
            margin-right: auto;
            min-width: 100%;
            display: inline-block;
          }
        `}</style>
      </div>
    );
  }
}

export default ExploreSpace;
