/***********************************
 * V4 Observation Information Container
 *
 *
 *
 ***********************************/

import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  astronaut,
  shadows,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { likeImage } from 'app/services/my-pictures/like-image';
import { Button } from 'react-bootstrap';
import Modal from 'react-modal';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { customModalStyles } from 'app/styles/mixins/utilities';
import LikeButton from 'app/components/common/style/buttons/LikeButton';

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

class BootstrappedImageDetails extends Component {
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
    if (this.props.likePrompt !== nextProps.likePrompt) {
      this.setState({
        likePrompt: nextProps.likePrompt,
      });
    }

    if (this.props.likesCount !== nextProps.likesCount) {
      this.setState({
        count: nextProps.likesCount,
      });
    }
  }

  closeModal = e => {
    e.preventDefault();
    this.setState({
      isOpen: false,
      promptText: null,
    });
  };

  likeObservation = e => {
    e.preventDefault();

    const { customerImageId, user, showLikePrompt } = this.props;

    if (showLikePrompt) {
      this.setState({
        isOpen: true,
      });
    } else {
      likeImage({
        likeId: customerImageId,
        token: user.token,
        at: user.at,
        cid: user.cid,
      }).then(this.handleLikeResult);
    }
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

  onShare = () => {
    const {
      actions: { shareMemberPicture },
      customerImageId,
    } = this.props;

    shareMemberPicture({ customerImageId }).then(data =>
      this.setState({
        isOpen: true,
        promptText: data.payload.sharePrompt,
      })
    );
  };

  onEdit = () => {
    const { observationLog, observationTitle } = this.props;
    console.log(observationLog, observationTitle);
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
            <div
              className="obs-author"
              dangerouslySetInnerHTML={{ __html: fileData['Photo by'] }}
            />
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
            <LikeButton onClickEvent={this.likeObservation} count={count} />
          </div>
          <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            style={customModalStyles}
            contentLabel="Observations"
            onRequestClose={this.closeModal}
          >
            <i className="fa fa-close" onClick={this.closeModal} />
            <p
              className=""
              dangerouslySetInnerHTML={{ __html: promptText || likePrompt }}
            />
          </Modal>
          {canEditFlag && (
            <div className="pull-right my-3">
              <Btn mod="circle" onClick={this.onEdit}>
                <Icon i="pencil" />
              </Btn>
            </div>
          )}
          {canShareFlag && (
            <div className="pull-right my-3">
              <Button onClick={this.onShare}>Share</Button>
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

export default BootstrappedImageDetails;
