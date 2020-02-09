import React, { Component } from 'react';
import { API } from 'app/api';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { IMAGE_DETAILS } from '../../../../../services/image-details';

import styles from './SwiperItem.style';

const { number, func } = PropTypes;

@withTranslation()
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
    if (
      currentIndex !== nextProps.currentIndex &&
      nextProps.imageIndex === nextProps.currentIndex
    ) {
      this.fetchImageDetails();
    }
  }

  fetchImageDetails = () => {
    const {
      customerImageId,
      setObservationInfo,
      purgeCardState,
      user,
    } = this.props;
    const { token, at, cid } = user;
    purgeCardState();
    this.setState({ imageURL: null });
    API.post(IMAGE_DETAILS, {
      cid,
      at,
      token,
      customerImageId,
      useShareToken: 'n',
      callSource: 'sharedpictures',
    })
      .then(({ data }) => {
        const { imageTitle, displayName, observationLog, imageURL } = data;
        setObservationInfo({
          ...data,
          title: imageTitle,
          author: displayName,
          description: observationLog,
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
  };

  render() {
    const { imageURL } = this.state;
    const { t } = this.props;
    return (
      <div className="mobile-swiper-root">
        {imageURL ? (
          <img className="obs-image" src={imageURL} alt="Observation" />
        ) : (
          <div className="obs-image center-content">
            {t('Dashboard.LoadingImage')}
            ...
          </div>
        )}
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
