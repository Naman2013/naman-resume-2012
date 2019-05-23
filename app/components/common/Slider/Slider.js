/***********************************
 * V4 Slider - wrapper component for other components that use react-slick
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import defaultSliderConfiguration from './sliderConfig';

import '../community-perspectives/slick.min.css';
import '../community-perspectives/slick-theme.min.css';
import style from './Slider.style';

const { any, arrayOf, shape } = PropTypes;

class SloohSlider extends Component {
  static propTypes = {
    slideList: arrayOf(any),
    emptyMessage: shape({}).isRequired,
    sliderConfig: shape({}),
  };

  static defaultProps = {
    slideList: [],
    sliderConfig: defaultSliderConfiguration(),
  };

  render() {
    const { sliderConfig, slideList, emptyMessage } = this.props;
    return (
      <div className="root">
        {slideList && slideList.length ? (
          <div className="slider-container">
            <Slider
              {...sliderConfig}
              ref={c => {
                this.slider = c;
              }}
            >
              {slideList.map(slideElement => (
                <div>{slideElement.render()}</div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="empty">{emptyMessage}</div>
        )}
        <style jsx global>
          {style}
        </style>
      </div>
    );
  }
}

export default SloohSlider;
