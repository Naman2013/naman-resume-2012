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
import { golda, romance } from 'styles/variables/colors_tiles_v4';

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
      emptyMessage,
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

        <style jsx global>
          {`



            .slick-prev, .slick-next {
              width: 50px;
              height: 50px;
              margin: 0 15px;
              transform: translate(0, -50%);
              cursor: pointer;
              color: ${romance};
              border: solid 2px ${golda};
              border-radius: 50%;
              z-index: 9;
              background-color: transparent;
            }

            .slick-prev:before {
              content: "";
              position: absolute;
              width: 17px;
              height: 14px;
              top: 35%;
              left: 35%;
              z-index: 9;
              background: url('https://vega.slooh.com/assets/v4/common/slider_arrow_blue.svg') 0 0 no-repeat;
            }
            .slick-next:before {
              content: "";
              position: absolute;
              width: 17px;
              height: 14px;
              top: 35%;
              left: 35%;
              z-index: 9;
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
