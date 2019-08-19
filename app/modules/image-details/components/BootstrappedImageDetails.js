import EditHeader from 'app/modules/image-details/containers/edit-header';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import ObjectDetailList from 'app/modules/image-details/components/ObjectDetailList';
import MainContainer from './partials/MainContainer';
import AsideContainer from './partials/AsideContainer';
import styles from './ImageDetails.style';
import './styles.scss';

const {
  any,
  arrayOf,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;

const ViewHeader = ({ imageTitle }) => (
  <Fragment>
    <h3 className="text-center">AN OBSERVATION OF</h3>
    <div
      className="obs-img-subheader text-center"
      dangerouslySetInnerHTML={{ __html: imageTitle }}
    />
  </Fragment>
);

const BootstrappedImageDetails = props => {
  const {
    actions,
    imageTitle,
    imageURL,
    isMobile,
    isScreenLarge,
    objectId,
    scheduledMissionId,
    iconFileData,
    canEditFlag,
    customerImageId,
    imageDownloadFilename,
    imageDownloadURL,
    observationTagsError,
    refetchData,
  } = props;

  const showMissionRelatedInfo = Number(scheduledMissionId) > 0;
  const rightPanelDisplayFlags = [showMissionRelatedInfo];
  const showRightContainer =
    rightPanelDisplayFlags.filter(flag => !!flag).length > 0;
  const [isOpen, openModal] = useState(false);
  return (
    <div className="container mt-5 image-details">
      <div className="row mb-5">
        <div className="col-12">
          <div className="obs-img-container">
            <div className="obs-header">
              {canEditFlag ? (
                <EditHeader
                  imageTitle={imageTitle}
                  customerImageId={customerImageId}
                  imageDownloadFilename={imageDownloadFilename}
                  imageDownloadURL={imageDownloadURL}
                />
              ) : (
                <ViewHeader imageTitle={imageTitle} />
              )}
            </div>
            <div className="obs-image-container">
              <img
                className="obs-image"
                src={imageURL}
                style={{ cursor: 'pointer' }}
                onClick={() => openModal(!isOpen)}
              />
              <ModalImg
                isOpen={isOpen}
                imageURL={imageURL}
                onHide={() => openModal(!isOpen)}
              />
            </div>
            {objectId && objectId !== '0' && (
              <div className="object-details">
                <ObjectDetailList
                  isMobile={isMobile}
                  objectId={objectId}
                  iconFileData={iconFileData}
                  scheduledMissionId={scheduledMissionId}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/*<div className="row">
        <div className="col-md-8 mb-5 main-container">
          <MainContainer {...props} actions={actions} />
        </div>
        <div className="col-md-4 mb-5 main-container">
          <AsideContainer
            {...props}
            showMissionRelatedInfo={showMissionRelatedInfo}
          />
        </div>
      </div>*/}

      <ResponsiveTwoColumnContainer
        renderNavigationComponent={navProps => (
          <TwoTabbedNav
            firstTitle="Observations"
            secondTitle="Details"
            firstTabIsActive={navProps.showMainContainer}
            firstTabOnClick={navProps.onShowMainContainer}
            secondTabIsActive={navProps.showAsideContainer}
            secondTabOnClick={navProps.onShowAsideContainer}
          />
        )}
        renderAsideContent={() => (
          <div>
            {showRightContainer ? (
              <AsideContainer
                {...props}
                showMissionRelatedInfo={showMissionRelatedInfo}
              />
            ) : null}
          </div>
        )}
        isScreenSize={isScreenLarge}
        renderMainContent={() => (
          <MainContainer
            {...props}
            actions={actions}
            refetchData={refetchData}
          />
        )}
      />
      <style jsx>{styles}</style>
    </div>
  );
};

BootstrappedImageDetails.propTypes = {
  callSource: string,
  canEditFlag: bool,
  canLikeFlag: bool,
  commentsCount: number,
  commentsForumId: oneOfType([number, string]),
  commentsThreadId: oneOfType([number, string]),
  commentsTopicId: oneOfType([number, string]),
  customerImageId: string,
  displayName: string,
  gravityRankLabel: string,
  fileData: shape({
    'Photo By': string,
  }),
  imageTitle: string,
  imageURL: string,
  isScreenLarge: bool,
  likePrompt: string,
  likesCount: number,
  objectId: string,
  observationLog: string,
  observationTimeDisplay: arrayOf(string),
  observationTitle: string,
  saveLabel: string,
  scheduledMissionId: string,
  showCommentsLink: bool,
  showLikePrompt: bool,
  user: shape({
    at: oneOfType([number, string]),
    token: oneOfType([number, string]),
    cid: oneOfType([number, string]),
  }).isRequired,
};

BootstrappedImageDetails.defaultProps = {
  callSource: null,
  canEditFlag: false,
  canLikeFlag: true,
  commentsCount: 0,
  commentsForumId: 0,
  commentsThreadId: 0,
  commentsTopicId: 0,
  customerImageId: null,
  fileData: {
    'Photo By': '',
  },
  displayName: '',
  gravityRankLabel: '',
  imageTitle: '',
  imageURL: '',
  isScreenLarge: true,
  likesCount: 0,
  likePrompt: '',
  showLikePrompt: true,
  objectId: null,
  observationLog: '',
  observationTimeDisplay: [],
  observationTitle: '',
  saveLabel: '',
  scheduledMissionId: null,
  showCommentsLink: false,
};

export default BootstrappedImageDetails;
