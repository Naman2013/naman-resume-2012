/***********************************
* V4 Slider - wrapper component for other components that use react-slick
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import 'components/common/community-perspectives/slick.min.css';
import 'components/common/community-perspectives/slick-theme.min.css';
import { black, gray } from 'styles/variables/colors';
// import { secondaryFont } from 'styles/variables/fonts';

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
    slideList: arrayOf(any).isRequired,
    render: func.isRequired,
    slidesToShow: number,
    slidesToScroll: number,
    initialSlide: number,
    emptyMessage: string,
  }

  static defaultProps = {
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: null,
    emptyMessage: 'There is nothing to show',
  }

  state = {
    currentIndex: this.props.initialSlide || this.props.slideList.length - 1,
  }

  beforeSlideChange = (prevIndex, currentIndex) => {
    this.setState({
      currentIndex,
    });
  }

  changeSlide = (image) => {
    this.slider.slickGoTo(image.imageIndex);
    this.setState({
      currentIndex: image.imageIndex,
    });

  }

  render() {
    const {
      emptyMessage,
      slideList,
      slidesToShow,
      slidesToScroll,
    } = this.props;

    const { currentIndex } = this.state;

    const sliderSettings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow,
      slidesToScroll,
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
      // nextArrow: <div>Next<i className="fa fa-arrow-right" /></div>,
      // prevArrow: <div><i className="fa fa-arrow-left" /><div>Previous</div></div>,
    };

    return (
      <div className="root">
        {slideList.length === 0 && <div className="empty" dangerouslySetInnerHTML={{ __html: emptyMessage }} />}
        {slideList.length > 0 && <div className="observation-slider-container">
          <Slider
            {...sliderSettings}
            ref={c => this.slider = c}
          >
            {slideList}
          </Slider>
        </div>}

        <style jsx>{`

        `}
        </style>

        <style jsx global>
          {`


          `}
        </style>
      </div>);
  }
}

export default SloohSlider;
