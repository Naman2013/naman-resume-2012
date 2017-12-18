import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExploreSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="explorespace-container">
        <div className="explorespace-container-overlay">
          <div className="explorespace-container-overlayimage"/>
          <div className="explorespace-sphereimagecontainer">
            <img src="../../../assets/images/welcome/Spheres.png"/>
            <br/>
            <img src="../../../assets/images/welcome/Pointer_SemiCircle.png"/>
          </div>
        </div>

        <style jsx>{`
          .explorespace-container {
            background-image: -webkit-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(../../../assets/images/welcome/StarryNight_Dark.png);
            background-image:  -moz-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(../../../assets/images/welcome/StarryNight_Dark.png);
            background-image:  -o-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(../../../assets/images/welcome/StarryNight_Dark.png);
            background-image:  -ms-linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(../../../assets/images/welcome/StarryNight_Dark.png);
            background-image:  linear-gradient(rgba(0,0,0, 0) 0%,rgba(0,0,0, 1) 100%), url(../../../assets/images/welcome/StarryNight_Dark.png);
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
            bottom: 0;
            position: absolute;
            background-blend-mode: multiply;
          }

          .explorespace-sphereimagecontainer {
            z-index: 3;
            margin-left: auto;
            margin-right: auto;
            min-width: 100%;
            display: block;
            text-align: center;
            bottom: 0;
            position: absolute;
          }
        `}</style>
      </div>
    );
  }
}

export default ExploreSpace;
