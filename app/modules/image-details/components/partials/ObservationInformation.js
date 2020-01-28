/***********************************
 * V4 Observation Information Container
 *
 *
 *
 ***********************************/

import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import LikeSomethingButton from 'app/components/common/LikeSomethingButton';
import { Link } from 'react-router';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  astronaut,
  shadows,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { likeImage } from 'app/services/my-pictures/like-image';
import { Modal } from 'app/components/modal';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { WriteObservationStep3 } from 'app/modules/object-details/components/write-observation-step3';
import { ClubListPopover } from 'app/modules/clubs/components/club-list-popover';

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

class ObservationInformation extends Component {
  static propTypes = {
    canLikeFlag: bool,
    customerImageId: oneOfType([number, string]),
    fileData: shape({
      'Photo By': string,
    }),
    likesCount: number,
    likePrompt: string,
    showLikePrompt: bool,
    observationLog: string,
    observationTimeDisplay: arrayOf(string),
    observationTitle: string,
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }).isRequired,
  };

  static defaultProps = {
    canLikeFlag: true,
    customerImageId: '',
    fileData: {
      'Photo By': '',
    },
    likesCount: 0,
    likePrompt: '',
    showLikePrompt: true,
    observationLog: '',
    observationTimeDisplay: [],
    observationTitle: '',
  };

  state = {
    isOpen: false,
    likePrompt: this.props.likePrompt,
    count: this.props.likesCount,
    promptText: null,
  };

  componentWillReceiveProps(nextProps) {
    const { likePrompt, likesCount } = this.props;

    if (likePrompt !== nextProps.likePrompt) {
      this.setState({
        likePrompt: nextProps.likePrompt,
      });
    }

    if (likesCount !== nextProps.likesCount) {
      this.setState({
        count: nextProps.likesCount,
      });
    }
  }

  closeModal = e => {
    if (e) {
      e.preventDefault();
    }
    const { refetchData } = this.props;

    this.setState({
      isOpen: false,
      promptText: null,
    });
    refetchData();
  };

  likeObservation = () => {
    const { customerImageId, user } = this.props;
    return likeImage({
      likeId: customerImageId,
      token: user.token,
      at: user.at,
      cid: user.cid,
    });
  };

  handleLikeResult = res => {
    const { apiError, showLikePrompt, likesCount, likePrompt } = res.data;
    if (!apiError) {
      this.setState({
        count: likesCount,
      });
    }

    if (showLikePrompt) {
      this.setState({
        likePrompt,
        isOpen: true,
      });
    }
  };

  openSuccessShareableImageModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  onEdit = () => {
    const { observationLog, observationTitle, onEdit } = this.props;
    onEdit(observationLog, observationTitle);
  };

  render() {
    const {
      canLikeFlag,
      fileData,
      observationLog,
      observationTimeDisplay,
      observationTitle,
      imageTitle,
      canShareFlag,
      canEditFlag,
      shareMemberPhotoData,
      likesCount,
      likedByMe,
      likeTooltip,
      showLikePrompt,
      iconFileData,
      actions: { getProfileGroupList, shareMemberPicture },
      customerImageId,
      profileGroupList,
    } = this.props;

    const { isOpen, likePrompt, count, promptText } = this.state;
    return (
      <div className="root">
        <div className="obs-container component-container clearfix">
          <div
            className="obs-title"
            dangerouslySetInnerHTML={{ __html: observationTitle || imageTitle }}
          />
          <div className="obs-name-and-time">
            <Link to={iconFileData?.Member?.linkUrl}>
              <div
                className="obs-author"
                dangerouslySetInnerHTML={{ __html: fileData['Photo by'] }}
              />
            </Link>
            <div
              className="obs-time"
              dangerouslySetInnerHTML={{
                __html: observationTimeDisplay.join(' '),
              }}
            />
          </div>
          <div
            className="obs-content"
            dangerouslySetInnerHTML={{ __html: observationLog }}
          />
          <div className="pull-left">
            <LikeSomethingButton
              likeHandler={this.likeObservation}
              likesCount={likesCount}
              likedByMe={likedByMe}
              likeTooltip={likeTooltip}
              likePrompt={likePrompt}
              likeParams={{}}
              showLikePrompt={showLikePrompt}
            />
          </div>

          <Modal show={isOpen} onHide={this.closeModal}>
            <WriteObservationStep3
              onHide={this.closeModal}
              shareMemberPhotoData={shareMemberPhotoData}
            />
          </Modal>

          {canEditFlag && (
            <div className="pull-right my-3 ml-3">
              <Btn mod="circle" onClick={this.onEdit}>
                <Icon i="pencil" />
              </Btn>
            </div>
          )}
          {canShareFlag && (
            <div className="pull-right my-3 ml-3">
              <ClubListPopover
                show
                getProfileGroupList={getProfileGroupList}
                shareMemberPicture={shareMemberPicture}
                customerImageId={customerImageId}
                profileGroupList={profileGroupList}
                shareMemberPhotoData={shareMemberPhotoData}
                openSuccessShareableImageModal={
                  this.openSuccessShareableImageModal
                }
              />
            </div>
          )}
        </div>
        <style jsx>{`
          .root {
            font-family: ${primaryFont};
            color: ${astronaut};
          }

          .component-container {
            background-color: ${romance};
            -moz-box-shadow: 0 2px 4px 1px ${shadows};
            -webkit-box-shadow: 0 2px 4px 1px ${shadows};
            box-shadow: 0 2px 4px 1px ${shadows};
            padding: 25px;
          }
          .obs-title {
            font-family: ${secondaryFont};
            font-size: 24px;
            padding: 15px 0;
            border-bottom: 1px solid ${astronaut};
          }
          .obs-name-and-time {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 10px;
            text-transform: uppercase;
            font-weight: bold;
            padding: 10px 0;
          }

          .obs-author,
          .obs-time {
            flex: 1 1 0;
          }

          .obs-author {
            color: #415671;
          }

          .obs-time {
            text-align: right;
          }

          .obs-content {
            font-family: ${secondaryFont};
            font-size: 19px;
            margin: 25px 0;
          }

          .fa-close {
            position: absolute;
            top: 5px;
            right: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default ObservationInformation;
