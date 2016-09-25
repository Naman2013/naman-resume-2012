import React, { Component, PropTypes } from 'react';

class LunarPhase extends Component {
  render() {
    return(
      <div className="weather-widget">
        <div className="transparent-background weather-view">
          <h5 className="title-label">{this.props.title}</h5>
          <figure className="lunar-phase-figure">
            <img
              alt={this.props.phaseTextIllum}
              src={this.props.phaseImageURL} width="43" height="43" />
            <figcaption className="caption">
              {this.props.phaseText}
            </figcaption>
          </figure>
          <p className="phase-text"></p>
        </div>
      </div>
    );
  }
}

LunarPhase.propTypes = {
  title: PropTypes.string,
  phaseText: PropTypes.string,
  phaseTextIllum: PropTypes.string,
  phaseImageURL: PropTypes.string
};

export default LunarPhase;
