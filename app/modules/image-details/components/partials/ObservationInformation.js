/***********************************
 * V4 Observation Information Container
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  astronaut,
  shadows,
  romance,
} from 'app/styles/variables/colors_tiles_v4';
import { likeImage } from 'app/services/my-pictures/like-image';
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
    likePrompt: '',
    count: 0,
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

  render() {
    const {
      canLikeFlag,
      fileData,
      observationLog,
      observationTimeDisplay,
      observationTitle,
      imageTitle,
    } = this.props;

    const { isOpen, likePrompt, count } = this.state;
    return (
      <div className="root">
        <div className="obs-container component-container">
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
          <LikeButton onClickEvent={this.likeObservation} count={count} />
          <Modal
            ariaHideApp={false}
            isOpen={isOpen}
            style={customModalStyles}
            contentLabel="Observations"
            onRequestClose={this.closeModal}
          >
            <i className="fa fa-close" onClick={this.closeModal} />
            <p className="" dangerouslySetInnerHTML={{ __html: likePrompt }} />
          </Modal>
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
