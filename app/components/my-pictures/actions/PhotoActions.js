import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddToGallery from './AddToGallery';
import RemoveFromGallery from './RemoveFromGallery';
import DeleteGallery from './DeleteGallery';
import DeleteImage from './DeleteImage';
import DownloadImage from './DownloadImage';
import ShareMemberPhoto from './ShareMemberPhoto';
import SocialSharingBar from '../../common/social-sharing-bar/SocialSharingBar';
import Heart from '../../common/heart/heart';
import { likeImage } from '../../../services/my-pictures/like-image';

const getTheme = actionSource => (
  (actionSource === 'galleryImageDetails' || actionSource === 'imageDetails') ?
  'dark' : 'light');

class PhotoActions extends Component {
  static propTypes = {
    theme: PropTypes.oneOf(['light', 'dark']),
    imageURL: PropTypes.string,
    canEditFlag: PropTypes.bool,
    canSocialShareFlag: PropTypes.bool,
    customerImageId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    galleryId: PropTypes.number,
    actionSource: PropTypes.string.isRequired,
    heartProps: PropTypes.shape({
      membershipType: PropTypes.string,
      showLikePrompt: PropTypes.bool,
      likePrompt: PropTypes.string,
      canLikeFlag: PropTypes.bool,
      likeAction: PropTypes.func,
      count: PropTypes.number,
      theme: PropTypes.string,
      likeType: PropTypes.string,
      likeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  };

  static defaultProps = {
    theme: 'light',
    imageURL: '',
    canEditFlag: false,
    galleryId: null,
    customerImageId: null,
    heartProps: {},
    canSocialShareFlag: false,
    photoViewFullURL: '',
    socialSharePageURL: '',
    socialShareDescription: '',
  };

  render() {
    const {
      theme,
      actionSource,
      canEditFlag,
      canShareFlag,
      canSocialShareFlag,
      customerImageId,
      galleryId,
      heartProps,
      imageURL,
      scheduledMissionId,
      socialSharePageURL,
      socialShareDescription,
      imageTitle,
      photoViewFullURL,
    } = this.props;

    const canDownload = actionSource !== 'galleries';
    const canRemovePhoto = actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canDeleteGallery = actionSource === 'galleries';
    const canDeleteImage = actionSource === 'photoRoll' || actionSource === 'imageDetails' || actionSource === 'galleryPictures' || actionSource === 'galleryImageDetails';
    const canLikePhoto = actionSource === 'galleryImageDetails' || actionSource === 'imageDetails';

    const encodeurl = require('encodeurl');
    const base64 = require('base-64');
    let socialShareImageTitle = imageTitle;

    if (socialShareImageTitle == '') {
      /* the social sharing modules require a title, so even a space is sufficient */
      socialShareImageTitle = encodeurl(base64.encode('Shared Photo from Slooh.com'));
    } else {
      socialShareImageTitle = encodeurl(base64.encode(imageTitle));
    }

    /* construct the social sharing URL */
    const shareURL = socialSharePageURL +
        "?title=" + socialShareImageTitle +
        "&pagetype=image" +
        "&description=" + encodeurl(base64.encode(socialShareDescription)) +
        "&shareURL=" + encodeurl(base64.encode(photoViewFullURL)) +
        "&imageURL=" + encodeurl(base64.encode(imageURL));

    return (
      <div className={`actions ${getTheme(actionSource)}`}>
        {canLikePhoto && <Heart
          {...heartProps}
          likeAction={likeImage}
          showLikeText={false}
        />}
        {canEditFlag && <AddToGallery
          theme={theme}
          actionSource={actionSource}
          customerImageId={customerImageId}
        />}
        {canEditFlag && canRemovePhoto &&
          <RemoveFromGallery
            theme={theme}
            customerImageId={customerImageId}
            galleryId={galleryId}
            actionSource={actionSource}
          />}
        {canEditFlag && canDeleteImage &&
          <DeleteImage
            theme={theme}
            galleryId={galleryId}
            customerImageId={customerImageId}
            actionSource={actionSource}
            scheduledMissionId={scheduledMissionId}
          />}
        {canDeleteGallery &&
          <DeleteGallery
            galleryId={galleryId}
          />}
        {canDownload && <DownloadImage
          imageURL={imageURL}
        />}
        {canShareFlag && <ShareMemberPhoto
          customerImageId={customerImageId}
        />}
        {canSocialShareFlag && <SocialSharingBar
          contentLayout="horizontal"
          shareTitle={socialShareImageTitle}
          shareDescription={socialShareDescription}
          shareURL={shareURL}
          shareImageURL={imageURL}
        />}

        <style jsx>{`
          .actions {
            display: flex;
            flex-direction: row;
            margin-top: -5px;
          }
        `}
        </style>
      </div>
    );
  }
}

export default PhotoActions;
