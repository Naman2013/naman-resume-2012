import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { black, white, lightGray, darkBlueGray } from '../../styles/variables/colors';

class ExploreSpace extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="explorespace-container">
          <div className="explorepace-titlecontainer">
            <h3 className="subtitle explorespace-title-1 title big">LEARN TO</h3>
            <h2 className="subtitle explorespace-title-2 title big">EXPLORE</h2>
            <h1 className="title big explorespace-title-3 title big">SPACE</h1>
          </div>
        <style jsx>{`

          .explorespace-title-1 {
            color: ${white};
            font-size: 2em;
            font-weight: bold;
          }

          .explorespace-title-2 {
            color: ${white};
            font-size: 4em;
            font-weight: bold;
          }

          .explorespace-title-3 {
            color: ${white};
            font-size: 10em;
            font-weight: bold;
          }

          .explorespace-container {
            background: url(https://vega.slooh.com/assets/images/welcome/Hero_Section.jpg) no-repeat center bottom;
            min-height: 768px;
            height: 768px;
            z-index: 0;
            position: relative;
            display: block;
          }

          .explorepace-titlecontainer {
            padding-top: 5%;
            min-width: 100%;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }
}

export default ExploreSpace;
