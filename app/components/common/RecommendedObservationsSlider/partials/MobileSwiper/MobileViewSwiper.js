import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Swiper from 'react-slick';
import { API } from 'app/api';
import { LIKE } from 'app/services/like';
import { connect } from 'react-redux';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import ObservationComments from 'app/modules/observations/containers/observation-comments';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import SwiperItem from './SwiperItem';

import styles from './MobileViewSwiper.style';

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

@withTranslation()
class MobileViewSwiper extends Component {
  state = {
    ...emptyState,
    likesNumber: null,
    currentIndex: 0,
    isDiscussionsOpen: false,
  };

  setObservationInfo = data => {
    this.setState({
      ...data,
      loading: false,
    });
  };

  purgeState = () => this.setState({ ...emptyState });

  handleSlideChange = (old, nextSlideIndex) => {
    this.setState({
      currentIndex: Math.max(0, nextSlideIndex),
      isDiscussionsOpen: false,
    });
  };

  handleLike = () => {
    const { user } = this.props;
    const { customerImageId, showLikePrompt } = this.state;
    const { token, at, cid } = user;

    if (!showLikePrompt) {
      return API.post(LIKE, {
        cid,
        at,
        token,
        likeId: customerImageId,
      }).then(res => {
        this.setState({
          ...res.data,
        });
      });
    }
  };

  render() {
    const { imagesList, t, readOnly, user } = this.props;
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
      likedByMe,
      likeTooltip,
      customerImageId,
      likePrompt,
      showLikePrompt,
      likesNumber,
      commentsThreadId,
      commentsForumId,
      commentsTopicId,
      isDiscussionsOpen,
    } = this.state;

    return (
      <div className="mobile-swiper-root">
        {!loading ? (
          <div className="top">
            <div className="title">{title}</div>
            {readOnly ? (
              <div className="author">{author}</div>
            ) : (
              <Link to={iconFileData['Member']?.linkUrl}>
                <div className="author">{author}</div>
              </Link>
            )}
            <div
              className="description"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        ) : (
          <div className="top">
            {!error
              ? `${t('Dashboard.Loading')}...`
              : t('Dashboard.ErrorWhileLoading')}
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
                user={user}
              />
            ))}
          </Swiper>
        </div>
        <div className="bottom">
          <div className="buttons">
            {!readOnly && (
              <>
                <div className="button">
                  <LikeSomethingButton
                    mod="no-border"
                    likePrompt={likePrompt}
                    likesCount={likesNumber || likesCount}
                    likedByMe={likedByMe}
                    likeTooltip={likeTooltip}
                    likeHandler={this.handleLike}
                    customerId={customerImageId}
                    showLikePrompt={showLikePrompt}
                  >
                    <img
                      className="icon"
                      src="https://vega.slooh.com/assets/v4/common/heart.svg"
                      alt="heart"
                    />
                    {!likesCount ? '0' : likesCount}
                  </LikeSomethingButton>
                </div>
                <div
                  className="button"
                  onClick={(): void =>
                    this.setState({ isDiscussionsOpen: !isDiscussionsOpen })
                  }
                >
                  <img
                    className="icon"
                    src="https://vega.slooh.com/assets/v4/common/comment.svg"
                    alt="comment"
                  />
                  {!commentsCount ? '0' : commentsCount}
                </div>
                {linkUrl && (
                  <Link to={linkUrl} className="button details">
                    {t('Dashboard.Details')}
                    <img
                      src="https://vega.slooh.com/assets/v4/icons/horz_arrow_right_astronaut.svg"
                      alt="arrow-right"
                    />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        {isDiscussionsOpen && !readOnly && (
          <ObservationComments
            topLevelThread={false}
            callSource={CALLSOURCE_PHOTOVIEW}
            count={10}
            commentsCount={commentsCount}
            commentsThreadId={commentsThreadId}
            forumId={commentsForumId}
            topicId={commentsTopicId}
            threadId={commentsThreadId}
          />
        )}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(MobileViewSwiper);
