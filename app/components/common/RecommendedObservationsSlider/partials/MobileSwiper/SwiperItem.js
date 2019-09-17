import React, { Component } from 'react';
import { API } from 'app/api';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IMAGE_DETAILS } from '../../../../../services/image-details';

import styles from './SwiperItem.style';
import messages from './SwiperItem.messages';

const {
  number,
  func,
} = PropTypes;

class SwiperItem extends Component {
  state = {
    imageURL: '',
  };

  componentDidMount() {
    const { currentIndex, imageIndex } = this.props;
    if (currentIndex === imageIndex) {
      this.fetchImageDetails();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentIndex } = this.props;
    if (currentIndex !== nextProps.currentIndex && nextProps.imageIndex === nextProps.currentIndex) {
      this.fetchImageDetails();
    }
  }

  fetchImageDetails = () => {
    const { customerImageId, setObservationInfo, purgeCardState } = this.props;
    purgeCardState();
    this.setState({ imageURL: null });
    API.post(IMAGE_DETAILS, {
      customerImageId,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    })
      .then(({ data: { imageTitle, displayName, observationLog, imageURL, commentsCount, likesCount, linkUrl }}) => {
        setObservationInfo({
          title: imageTitle,
          author: displayName,
          description: observationLog,
          commentsCount,
          likesCount,
          linkUrl,
        });
        this.setState({
          imageURL,
        });
      })
      .catch(() => {
        setObservationInfo({
          error: true,
        });
      });
  }

  render() {
    const { imageURL } = this.state;
    return (
      <div className="mobile-swiper-root">
        {imageURL ? <img className="obs-image" src={imageURL} alt="Observation" /> : <div className="obs-image center-content"><FormattedMessage {...messages.LoadingImage} />...</div>}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

SwiperItem.propTypes = {
  customerImageId: number.isRequired,
  currentIndex: number.isRequired,
  imageIndex: number.isRequired,
  setObservationInfo: func.isRequired,
  purgeCardState: func.isRequired,
};

export default SwiperItem;
