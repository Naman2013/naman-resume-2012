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
import '../community-perspectives/slick.min.css';
import '../community-perspectives/slick-theme.min.css';
import { black, gray } from 'styles/variables/colors';

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
    slidesToShow: number,
    slidesToScroll: number,
    initialSlide: number,
    emptyMessage: string,
  }

  static defaultProps = {
    slideList: [],
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
      centerMode: true,
      //centerPadding: '50px',
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
      // nextArrow: <div>Next<i className="fa fa-arrow-right" /></div>,
      // prevArrow: <div><i className="fa fa-arrow-left" /><div>Previous</div></div>,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        }
      ],
    };

    return (
      <div className="root" key={uniqueId()}>
        {slideList.length === 0 && <div className="empty" dangerouslySetInnerHTML={{ __html: emptyMessage }} />}
        {
          slideList.length > 0 &&
          <div className="slider-container">
            <Slider
              {...sliderSettings}
              ref={(c) => { this.slider = c; }}
            >
              {slideList.map(slideElement => <div>{slideElement.render({ currentIndex })}</div>)}
            </Slider>
          </div>
        }

        <style jsx>{`

        `}
        </style>

        <style jsx global>
          {`
            .slick-prev, .slick-next {
              width: 50px;
              height: 50px;
              margin: 0 15px;
              transform: translate(0, -50%);
              cursor: pointer;
              color: #41566F;
              border: solid 2px #41566F;
              border-radius: 50%;
              background-color: transparent;
            }

            .slick-prev:before {
              content: "";
              position: absolute;
              width: 17px;
              height: 14px;
              top: 35%;
              left: 35%;
              z-index: -1;
              background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg') 0 0 no-repeat;
            }
            .slick-next:before {
              content: "";
              position: absolute;
              width: 17px;
              height: 14px;
              top: 35%;
              left: 35%;
              z-index: -1;
              background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg') 0 0 no-repeat;
              transform: rotate(180deg);
            }

            .dash-item-first .slick-prev, .dash-item-first .slick-next {
              border: solid 2px #FAD59A;
            }
            .dash-item-first .slick-prev:before {
              background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg') 0 0 no-repeat;
            }
            .dash-item-first .slick-next:before {
              background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_white.svg') 0 0 no-repeat;
            }

            .slick-slide {
              /* box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);
             margin: 3px 10px; */
            }

          `}
        </style>
      </div>);
  }
}

export default SloohSlider;
