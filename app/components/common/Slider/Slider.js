/***********************************
* V4 Slider - wrapper component for other components that use react-slick
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import uniqueId from 'lodash/uniqueId';
import defaultSliderConfiguration from './sliderConfig';

import '../community-perspectives/slick.min.css';
import '../community-perspectives/slick-theme.min.css';
import style from './Slider.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class SloohSlider extends Component {
  static propTypes = {
    slideList: arrayOf(any),
    emptyMessage: string,
    sliderConfig: shape({}),
  }

  static defaultProps = {
    slideList: [],
    sliderConfig: defaultSliderConfiguration(),
    emptyMessage: 'There is nothing to show',
  }

  render() {
    const {
      sliderConfig,
      slideList,
    } = this.props;
    return (
      <div className="root" key={uniqueId()}>
        {slideList.length === 0 && <div className="empty" dangerouslySetInnerHTML={{ __html: sliderConfig.emptyMessage }} />}
        {
          slideList.length > 0 &&
          <div className="slider-container">
            <Slider
              {...sliderConfig}
              ref={(c) => { this.slider = c; }}
            >
              {slideList.map(slideElement => <div key={uniqueId()}>{slideElement.render()}</div>)}
            </Slider>
          </div>
        }

        <style jsx>{`

        `}
        </style>

        <style jsx global>{style}</style>
      </div>);
  }
}

export default SloohSlider;
