
import React, { Component, useState, Fragment } from 'react';
import EditHeader from 'app/modules/image-details/containers/edit-header';
import { ModalImg } from 'app/modules/telescope/components/modal-img';
import TwoTabbedNav from 'app/components/TwoTabbedNav';
import ResponsiveTwoColumnContainer from 'app/components/ResponsiveTwoColumnContainer';
import ObjectDetailList from 'app/modules/image-details/components/ObjectDetailList';
import MainContainer from '../partials/MainContainer';
import AsideContainer from '../partials/AsideContainer';
import {
  CALLSOURCE_PHOTOVIEW,
  USE_SHARE_TOKEN_TRUE,
} from 'app/modules/image-details/components/imageDetailsConfiguration';

type TProfileActivityProps = {
  getImageDetails: (data: any) => Promise<any>;
  validateResponseAccess: (data: any) => Promise<any>;
  setObservationTags: (data: any) => Promise<any>;
  shareMemberPicture: (data: any) => Promise<any>;
  refetchData: any;

  likedByMe: boolean;
  likeTooltip: string;
  avatarURL: string;
  callSource: string;
  canEditFlag: boolean;
  isDesktop: boolean;
  canLikeFlag: boolean;
  canShareFlag: boolean;
  showMissionRelatedInfo: boolean;
  commentsCount: number;
  commentsForumId: number | string;
  commentsThreadId: number | string;
  commentsTopicId: number | string;
  customerImageId: string;
  displayName: string;
  gravityRankLabel: string;
  fileData: any;
  imageTitle: string;
  imageURL: string;
  isScreenLarge: boolean;
  likePrompt: string;
  likesCount: number;
  objectId: string;
  observationLog: string;
  observationTimeDisplay: any;
  observationTitle: string;
  saveLabel: string;
  scheduledMissionId: string;
  showCommentsLink: boolean;
  showLikePrompt: boolean;
  shareMemberPhotoData: any;
  user: User;
  shareToken: string;
  actions: any;
  isMobile: boolean;
  iconFileData: any;
  imageDownloadFilename: string;
  imageDownloadURL: string;
};

type TProfileActivityState = {
  isOpenModal: boolean;
};

export class ImageDetails extends Component<
  TProfileActivityProps,
  TProfileActivityState
> {
  state = {
    isOpenModal: false,
  }

  componentDidMount(): void {
    this.fetchData();
  }

  fetchData = (): Promise<any> => {
    const {
      actions: { getImageDetails },
      customerImageId,
      shareToken,
    } = this.props;

    return getImageDetails({
      callSource: CALLSOURCE_PHOTOVIEW,
      customerImageId,
      shareToken,
      useShareToken: USE_SHARE_TOKEN_TRUE,
    });
  };

  render() {
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
      canShareFlag,
      customerImageId,
      imageDownloadFilename,
      imageDownloadURL,
      observationLog,
      shareMemberPhotoData,
    } = this.props;
    const { isOpenModal } = this.state;

    const showMissionRelatedInfo = Number(scheduledMissionId) > 0;
    const rightPanelDisplayFlags = [showMissionRelatedInfo];
    const showRightContainer =
      rightPanelDisplayFlags.filter(flag => !!flag).length > 0;

    return (
      <Fragment>
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
                    observationLog={observationLog}
                    canEditFlag={canEditFlag}
                    canShareFlag={canShareFlag}
                    actions={actions}
                    refetchData={this.fetchData}
                    shareMemberPhotoData={shareMemberPhotoData}
                  />
                ) : (
                  <Fragment>
                    <h3 className="text-center">AN OBSERVATION OF</h3>
                    <div
                      className="obs-img-subheader text-center"
                      dangerouslySetInnerHTML={{ __html: imageTitle }}
                    />
                  </Fragment>
                )}
              </div>
              <div className="obs-image-container">
                <img
                  className="obs-image"
                  src={imageURL}
                  style={{ cursor: 'pointer' }}
                  onClick={() => this.setState({ isOpenModal: true })}
                />
                <ModalImg
                  isOpen={isOpenModal}
                  imageURL={imageURL}
                  onHide={() => this.setState({ isOpenModal: false })}
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

        <ResponsiveTwoColumnContainer
          renderNavigationComponent={(navProps: any) => (
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
                  {...this.props}
                  showMissionRelatedInfo={showMissionRelatedInfo}
                />
              ) : null}
            </div>
          )}
          isScreenSize={isScreenLarge}
          renderMainContent={() => (
            <MainContainer
              {...this.props}
              actions={actions}
              refetchData={this.fetchData}
            />
          )}
        />
      </Fragment>
    );
  }
}

export default ImageDetails;
