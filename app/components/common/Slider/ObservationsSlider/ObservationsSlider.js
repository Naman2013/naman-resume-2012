/***********************************
* V4 Slider - wrapper component for other components that use react-slick
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import defaultSliderConfiguration from '../sliderConfig';
import '../../community-perspectives/slick.min.css';
import '../../community-perspectives/slick-theme.min.css';

import style from './ObservationsSlider.style';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class ObservationsSlider extends Component {
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

  state = {
    currentIndex: 1,
  }

  beforeSlideChange = (old, nextIndex) => {
    this.setState({
      currentIndex: nextIndex,
    });
  }

  render() {
    const {
      sliderConfig,
      slideList,
    } = this.props;
    const { currentIndex } = this.state;
    return (
      <div className="root slooh-slider">
        {slideList.length === 0 && <div className="empty" dangerouslySetInnerHTML={{ __html: sliderConfig.emptyMessage }} />}
        {
          <div className="slider-container">
            <Slider
              {...sliderConfig}
              beforeChange={this.beforeSlideChange}
            >
              {slideList.map(slideElement => <div>{slideElement.render({ currentIndex })}</div>)}
            </Slider>
          </div>
        }

        <style jsx global>{style}</style>
      </div>);
  }
}

export default ObservationsSlider;
