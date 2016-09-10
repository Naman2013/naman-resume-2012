import React, { Component } from 'react';
import style from './earth-view.scss';

class EarthView extends Component {
  render() {

    const inlineStyles = {
      background: `url(${this.props.imageSource}) no-repeat center center`,
      backgroundSize: 'cover'
    };

    console.log(inlineStyles);

    return(
      <div className="weather-widget">
        <div style={inlineStyles} className="weather-view">
          <h5 className="title-label">Where on Earth?</h5>
        </div>
      </div>
    );
  }
}

export default EarthView;
