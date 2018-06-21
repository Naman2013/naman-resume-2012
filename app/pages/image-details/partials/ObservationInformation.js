/***********************************
* V4 Observation Information Container
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { darkGray, gray } from 'styles/variables/colors';
import { likeImage } from 'services/my-pictures/like-image';
import Modal from 'react-modal';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { customModalStyles } from 'styles/mixins/utilities';
import { button } from '../styles';
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
    fileData: shape({}),
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
  }

  static defaultProps = {
    canLikeFlag: true,
    customerImageId: '',
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
    count: this.props.likesCount || 0,
  };

  closeModal = (e) => {
    e.preventDefault();
    this.setState({
      isOpen: false,
    })
  }

  likeObservation = (e) => {
    e.preventDefault();

    const {
      customerImageId,
      user,
      showLikePrompt,
    } = this.props;

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
  }

  handleLikeResult = (res) => {
    const {
      apiError,
      showLikePrompt,
      likesCount,
      likePrompt,
    } = res.data;
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
  }


  render() {
    const {
      canLikeFlag,
      fileData,
      observationLog,
      observationTimeDisplay,
      observationTitle,
    } = this.props;

    const { isOpen, likePrompt, count } = this.state;
    return (<div className="root">
      <div className="obs-container component-container">
        <div className="obs-title" dangerouslySetInnerHTML={{ __html: observationTitle}} />
        <div className="obs-name-and-time">
          <div className="obs-author" dangerouslySetInnerHTML={{ __html: fileData['Photo By']}} />
          <div className="obs-time" dangerouslySetInnerHTML={{ __html: observationTimeDisplay.join('')}} />
        </div>
        <div className="obs-content" dangerouslySetInnerHTML={{ __html: observationLog}} />
        {canLikeFlag ?
          <button
            className="heart-button"
            onClick={this.likeObservation}
          >
            <i
              style={{
                backgroundImage: 'url(\'\')',
              }}
            />
            <span dangerouslySetInnerHTML={{ __html: count }}></span>
          </button> : null
        }
        <Modal
          isOpen={isOpen}
          style={customModalStyles}
          contentLabel="Observations"
          onRequestClose={this.closeModal}
        >
          <i className="fa fa-close" onClick={this.closeModal} />
          <p className="modal-bio" dangerouslySetInnerHTML={{ __html: likePrompt }} />
        </Modal>
      </div>
      <style jsx>{`

        .root {
          font-family: ${primaryFont};
          color: ${darkGray};
        }

        .component-container {
          margin: 25px;
          -moz-box-shadow: 0 2px 4px 3px ${gray};
          -webkit-box-shadow: 0 2px 4px 3px ${gray};
          box-shadow: 0 2px 4px 3px ${gray};
          padding: 25px;
        }
        .obs-title {
          font-family: ${secondaryFont};
          font-size: 24px;
          padding: 15px 0;
          border-bottom: 1px solid ${darkGray};
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

        .obs-author, .obs-time {
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

        .heart-button {
          ${button};
          width: 50px;
        }

        .fa-close {
          position: absolute;
          top: 5px;
          right: 10px;
        }
      `}</style>
    </div>);
  }
}

export default BootstrappedImageDetails;
