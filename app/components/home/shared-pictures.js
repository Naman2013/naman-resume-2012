import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import moment from 'moment';
import find from 'lodash/find';
import '../common/community-perspectives/slick.min.css';
import '../common/community-perspectives/slick-theme.min.css';
import SharedPicturesItem from './shared-pictures-item';
import SharedPicturesTimeline from './shared-pictures-timeline';
import { white, darkBlueGray } from '../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class SharedPictures extends Component {

  static propTypes = {
    imageList: arrayOf(shape({
      customerImageId: number.isRequired,
      imageIndex: number.isRequired,
      imageTimestamp: number.isRequired,
    })),
    heading: string,
    subheading: string,
    timelineData: shape({
      timelineCount: number.isRequired,
      timelineList: arrayOf(shape({
        label: string.isRequired,
        imageIndex: number.isRequired,
      })).isRequired,
    })
  };

  static defaultProps = {
    imageList: [],
    heading: '',
    subheading: '',
    timelineData: {},
  };

  state = {
    currentIndex: this.props.imageList.length - 1,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.imageList.length !== nextProps.imageList.length) {
      this.setState({
        currentIndex: nextProps.imageList.length - 1,
      });
    }
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
      imageList,
      heading,
      subheading,
      timelineData: { timelineList, timelineCount },
    } = this.props;
    const { currentIndex } = this.state;

    const mainPicturesSliderSettings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoading: true,
      initialSlide: currentIndex,
      adaptiveHeight: false,
      beforeChange: this.beforeSlideChange,
      // nextArrow: <div>Next<i className="fa fa-arrow-right" /></div>,
      // prevArrow: <div><i className="fa fa-arrow-left" /><div>Previous</div></div>,
    };

    const images = imageList.map(
      imageInfo => <div key={imageInfo.customerImageId}>
        <SharedPicturesItem
          {...imageInfo}
          isActive={imageInfo.imageIndex === currentIndex}
        />
      </div>
    );
    const currentTime = imageList[currentIndex] && imageList[currentIndex].imageTimestamp ? moment(imageList[currentIndex].imageTimestamp * 1000) : moment();
    const longTime = currentTime.utc().format('MMMM Do, YYYY');
    const utcTime = currentTime.utc().format('HH:mm UTC');
    return (
      <div className="shared-container">
        <div className="header">
          <h3 className="heading" dangerouslySetInnerHTML={{ __html: heading }} />
          <h4 className="subheading" dangerouslySetInnerHTML={{ __html: subheading }} />
        </div>
        {imageList.length === 0 && <div className="empty">There are no shared images.</div>}
        {imageList.length > 0 && <div className="shared-slider-container">
          <Slider
            {...mainPicturesSliderSettings}
            ref={c => this.slider = c}
          >
            {images}
          </Slider>
          <div className="timestamp">
            <h4 className="timestamp-top">{longTime}</h4>
            <h3 className="timestamp-bottom">{utcTime}</h3>
          </div>
        </div>}

        <SharedPicturesTimeline
          changeMainSlider={this.changeSlide}
          timelineList={timelineList}
          timelineCount={timelineCount}
        />
        <style jsx>{`

          .shared-container {
            padding: 25px 50px;
            background-color: #2d3949;
            color: ${white};
            min-height: 500px;
            margin-bottom: 0px;
          }
            @media(max-width:640px){

            .shared-container{padding:25px 30px}

            }
          .empty {
            padding: 50px;
            text-align: center;
          }
          .shared-slider-container {
            min-height: 400px;
          }

          .header {
            margin-bottom: 25px;
            text-align: center;
            font-size: 0.8rem;
          }

          .heading {
            font-size: 2.5rem;
          }

          .subheading {
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.25rem;
          }

          .shared-container :global(.slick-slider) {
            height: 50%;
          }

          .timestamp {
            text-align: center;
          }

          .timestamp-top, .timestamp-bottom {
            font-weight: bold;
            text-decoration: uppercase;
          }

          .timestamp-top {
            font-size: 1.1rem;
          }

          .timestamp-bottom {
            font-size: 2rem;
          }

          .timeline-img {
            margin-top: auto;
            width: 100%;
            max-height: 65px;
          }

        `}</style>

        <style global>
          {`

            .shared-container .slick-prev {
              z-index: 99999;
            }

            .shared-container .slick-prev,
            .shared-container .slick-next {
              color: ${white};
              font-size: 15px;
              width: 100px;
              height: 75px;
              padding-top: 100px;
              padding-bottom: 10px;
              text-align: middle;
            }

            .shared-container .slick-prev.slick-disabled,
            .shared-container .slick-next.slick-disabled {
              opacity: .25;
            }

            .shared-container .slick-prev:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f060";
              font-size: 40px;
              position: absolute;
              left: 25px;
              top: 40px;
            }

            .shared-container .slick-next:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f061";
              font-size: 40px;
              right: 30px;
              position: absolute;
              top: 40px;
            }
            @media(max-width:736px){
                      .shared-container .slick-prev,  .shared-container .slick-next{padding:0px; height:auto; text-indent:-9999999px}
                      .shared-container .slick-prev {left:-45px}
                      .shared-container .slick-next {right:-51px}
                      .shared-container .slick-prev:before,
                      .shared-container .slick-next:before {text-indent:0px; font-size:20px !important}

            }
          `}
        </style>
      </div>
    );
  }
}

export default SharedPictures;
