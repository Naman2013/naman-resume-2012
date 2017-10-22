import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import '../common/community-perspectives/slick.min.css';
import '../common/community-perspectives/slick-theme.min.css';
import { white, darkBlueGray } from '../../styles/variables/colors';

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
  };

  static defaultProps = {
    timelineList: [],
  };

  state = {
    currentIndex: 0,
  }

  beforeSlideChange = (prevIndex, currentIndex) => {
    this.setState({
      currentIndex,
    });
  }

  render() {
    const {
      timelineCount,
      timelineList
    } = this.props;
    const { currentIndex } = this.state;

    const timelineSlider = {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 500,
      focusOnSelect: true,
      slidesToShow: timelineCount,
      initialSlide: currentIndex,
      adaptiveHeight: true,
      centerMode: true,
      beforeChange: this.beforeSlideChange,
      nextArrow: <i className="fa fa-arrow-right" />,
      prevArrow: <i className="fa fa-arrow-left" />,
    };

    return (
      <div className="shared-timeline-container">
        {timelineList.length && <Slider
          {...timelineSlider}
          ref={c => this.timelineSlider = c}
        >
          {timelineList.map(date => (<div
            className="timeline-item"
            dangerouslySetInnerHTML={{
              __html: date.label
            }}
          />))}
        </Slider>}
        <style jsx>{`
          .timeline-item {
            cursor: pointer;
          }

        `}</style>

        <style global>
          {`

            .shared-container .slick-prev:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f060";
              font-size: 40px;
            }

            .shared-container .slick-next:before {
              font-family: FontAwesome;
              font-style: normal;
              content: "\\f061";
              font-size: 40px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default SharedPicturesTimeline;
