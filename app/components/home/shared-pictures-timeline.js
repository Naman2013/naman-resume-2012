import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classnames from 'classnames';
import '../common/community-perspectives/slick.min.css';
import '../common/community-perspectives/slick-theme.min.css';
import { pink, white, darkBlueGray } from '../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

class SharedPicturesTimeline extends Component {

  static propTypes = {
    timelineCount: number.isRequired,
    timelineList: arrayOf(shape({
      label: string.isRequired,
      imageIndex: number.isRequired,
    })),
    changeMainSlider: func.isRequired,
  };

  static defaultProps = {
    timelineList: [],
  };

  state = {
    currentIndex: 0,
  }

  beforeSlideChange = (prevIndex, currentIndex) => {
    const {
      changeMainSlider,
      timelineList,
    } = this.props;

    this.setState({
      currentIndex,
    });

    changeMainSlider(timelineList[currentIndex])
  }

  render() {
    const {
      timelineCount,
      timelineList
    } = this.props;
    const { currentIndex } = this.state;

    const timelineSlider = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      focusOnSelect: true,
      slidesToShow: timelineCount < 12 ? timelineCount-1 : 12,
      initialSlide: currentIndex,
      swipeToSlide: true,
      draggable: true,
      centerMode: false,
      beforeChange: this.beforeSlideChange,
      nextArrow: <i className="fa fa-arrow-right" />,
      prevArrow: <i className="fa fa-arrow-left" />,
    };

    const timelineItemClass = (arrayIdx) => {
      return classnames('timeline-item', {
        'timeline-active-item': arrayIdx === currentIndex,
      })
    };

    return (
      <div className="shared-timeline-container">
        {timelineList.length > 0 && <Slider
          {...timelineSlider}
          ref={c => this.timelineSlider = c}
        >
          {timelineList.map((date, i) => (<div
            key={date.imageIndex}
            className={timelineItemClass(i)}
            dangerouslySetInnerHTML={{
              __html: date.label
            }}
          />))}
        </Slider>}
        <style jsx>{`

          .shared-timeline-container {
            max-width: 750px;
            margin: 0 auto;
            margin-top: 15px;
          }
          .timeline-item {
            cursor: pointer;
          }

          .timeline-active-item {
            color: ${pink};
            font-weight: bold;
          }

        `}</style>

        <style global>
          {`

            .shared-timeline-container .slick-slide {
              text-align: center;
            }

            .shared-timeline-container .slick-prev:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f060";
              font-size: 16px !important;
            }

            .shared-timeline-container .slick-next:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f061";
              font-size: 16px !important;
            }

            .shared-timeline-container .slick-disabled {
              display: none !important;
            }
          `}
        </style>
      </div>
    );
  }
}

export default SharedPicturesTimeline;
