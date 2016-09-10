import React, { Component, PropTypes } from 'react';
import style from './earth-view.scss';

class EarthView extends Component {
  render() {

    const inlineStyles = {
      background: `url(${this.props.imageSource}) no-repeat center center`,
      backgroundSize: 'cover'
    };

    return(
      <div className="weather-widget">
        <div style={inlineStyles} className="weather-view">
          <h5 className="title-label">{this.props.titleText}</h5>
        </div>
      </div>
    );
  }
}

EarthView.propTypes = {
  titleText: PropTypes.string,
  imageSource: PropTypes.string
};

export default EarthView;
