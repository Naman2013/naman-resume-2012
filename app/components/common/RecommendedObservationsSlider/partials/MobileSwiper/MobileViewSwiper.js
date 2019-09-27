import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Swiper from 'react-slick';
import { FormattedMessage } from 'react-intl';

import SwiperItem from './SwiperItem';

import styles from './MobileViewSwiper.style';
import messages from './MobileViewSwiper.messages';

const { arrayOf, shape } = PropTypes;

const emptyState = {
  title: '',
  author: '',
  description: '',
  linkUrl: '',
  likesCount: 0,
  commentsCount: 0,
  loading: true,
  error: false,
  iconFileData: {},
};

const sliderConfig = {
  infinite: false,
  dots: true,
};

class MobileViewSwiper extends Component {
  state = {
    ...emptyState,
    currentIndex: 0,
  };

  setObservationInfo = ({
    title,
    author,
    description,
    commentsCount,
    likesCount,
    error,
    linkUrl,
    iconFileData,
  }) => {
    this.setState({
      title,
      author,
      description,
      likesCount,
      commentsCount,
      error,
      linkUrl,
      iconFileData,
      loading: false,
    });
  };

  purgeState = () => this.setState({ ...emptyState });

  handleSlideChange = (old, nextSlideIndex) => {
    this.setState({ currentIndex: Math.max(0, nextSlideIndex) });
  };

  render() {
    const { imagesList } = this.props;
    const {
      title,
      author,
      description,
      currentIndex,
      likesCount,
      commentsCount,
      loading,
      error,
      linkUrl,
      iconFileData,
    } = this.state;

    return (
      <div className="mobile-swiper-root">
        {!loading ? (
          <div className="top">
            <div className="title">{title}</div>
            <Link to={iconFileData?.Member?.linkUrl}>
              <div className="author">{author}</div>
            </Link>
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        ) : (
          <div className="top">
            {!error ? (
              `${<FormattedMessage {...messages.Loading} />}...`
            ) : (
              <FormattedMessage {...messages.ErrorWhileLoading} />
            )}
          </div>
        )}
        <div className="swiper-container">
          <Swiper {...sliderConfig} beforeChange={this.handleSlideChange}>
            {imagesList.map((image, index) => (
              <SwiperItem
                key={image.imageTimestamp}
                {...image}
                currentIndex={currentIndex}
                imageIndex={index}
                purgeCardState={this.purgeState}
                setObservationInfo={this.setObservationInfo}
              />
            ))}
          </Swiper>
        </div>
        <div className="bottom">
          <div className="buttons">
            <div className="button">
              <img
                className="icon"
                src="https://vega.slooh.com/assets/v4/common/heart.svg"
                alt="heart"
              />
              {likesCount}
            </div>
            <div className="button">
              <img
                className="icon"
                src="https://vega.slooh.com/assets/v4/common/comment.svg"
                alt="comment"
              />
              {commentsCount}
            </div>
            <a href={linkUrl} className="button details">
              <FormattedMessage {...messages.Details} />
              <img
                src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg"
                alt="arrow-right"
              />
            </a>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    );
  }
}

MobileViewSwiper.propTypes = {
  imagesList: arrayOf(shape({})),
};
MobileViewSwiper.defaultProps = {
  imagesList: [],
};
export default MobileViewSwiper;
