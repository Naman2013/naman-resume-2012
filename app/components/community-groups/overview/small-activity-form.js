/***********************************
* V4 Community Group Activity Form
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import PhotoUploadButton from 'components/common/style/buttons/PhotoUploadButton';
import deletePostImage from 'services/post-creation/delete-post-image';
import setPostImages from 'modules/set-post-images';
import Button from 'components/common/style/buttons/Button';
import {
  astronaut,
  romance,
  seashell,
  shadows,
} from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { dropShadowContainer, modalStyleFullPage } from 'styles/mixins/utilities';
import { screenMedium } from 'styles/variables/breakpoints';

const {
  bool,
  number,
  string,
} = PropTypes;

class FullActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
    uuid: string,
  }
  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: 'Write something...',
    uuid: null,
  }

  state = {
    activityText: '',
    showPopup: false,
    modalDescription: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
  }

  onTextChange = (e) => {
    this.setState({
      activityText: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      topicId,
      forumId,
      user,
    } = this.props;

    const {
      activityText,
      S3URLs,
    } = this.state;

    this.props.createThread({
      S3URLs,
      content: activityText,
      topicId,
      forumId,
    }).then((data) => {
      if (!data.apiError) {
        this.setState({
          showPopup: true,
          modalDescription: 'You post has been submitted',
          activityText: '',
          S3URLs: [],
        });
      } else {
        this.setState({
          showPopup: true,
          modalDescription: 'There was an error submitting your question.',
        });
      }
    });
  }

  displayForm = (e) => {
    e.preventDefault();
    this.setState({
      showPopup: true,
      modalDescription: null,
    });
  }

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
  }

  handleUploadImage = (event) => {
    event.preventDefault();

    const { cid, token, at } = this.props.user;
    const { uuid } = this.props;
    const data = new FormData();
    data.append('cid', cid);
    data.append('token', token);
    data.append('at', at);
    data.append('uniqueId', uuid);
    data.append('imageClass', 'discussion');
    data.append('attachment', event.target.files[0]);

    this.setState({
      uploadError: null,
      uploadLoading: true,
    });

    setPostImages(data)
      .then(res => this.handleUploadImageResponse(res.data))
      .catch(err => this.setState({
        uploadError: err.message,
        uploadLoading: false,
      }));
  }

  handleDeleteImage = (imageURL) => {
    if (!imageURL) { return; }

    const { cid, token, at } = this.props.user;
    const { uuid } = this.props;
    const imageClass = 'discussion';
    deletePostImage({
      cid,
      token,
      at,
      uniqueId: uuid,
      imageClass,
      imageURL,
    }).then(result => this.handleUploadImageResponse(result.data));
  }

  handleUploadImageResponse = (uploadFileData) => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      uploadLoading: false,
    });
  }

  render () {
    const {
      placeholder,
      showJoinPrompt,
      joinOrLeaveGroup,
      canPost,
      user,
    } = this.props;

    const {
      activityText,
      modalDescription,
      showPopup,
      uploadError,
      uploadLoading,
    } = this.state;

    return (
      <div className="root">
        <div className="fake-input" dangerouslySetInnerHTML={{ __html: placeholder }} onClick={this.displayForm} />
        <Modal
          ariaHideApp={false}
          isOpen={showPopup}
          style={modalStyleFullPage}
          contentLabel="Comment"
          onRequestClose={this.closeModal}
        >
          <div onClick={this.closeModal} className="top-bar"><i className="fa fa-arrow-left" /><span className="back">BACK</span></div>
          {modalDescription ? <p className="" dangerouslySetInnerHTML={{ __html: modalDescription }} /> : null}
          <form className="form">
            <textarea
              className="activity-input"
              onChange={this.onTextChange}
              maxLength={100}
              value={activityText}
              placeholder={placeholder}
            />
            <div className="flex-right">{activityText.length}/100</div>
            <div className="flex-container">
              <div>
                <PhotoUploadButton handleUploadImage={this.handleUploadImage} />
                {uploadError && <span className="errorMsg">{uploadError}</span>}
                {(!uploadError && uploadLoading) && <div className="fa fa-spinner" />}
              </div>
              <div>
                {canPost ?
                  <Button text="Comment" onClickEvent={this.submitForm} /> :
                  <Button text="Join to make a post" onClickEvent={joinOrLeaveGroup} />
                }
              </div>
            </div>
          </form>
        </Modal>
        <style jsx>{`
          .root {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            min-height: 120px;
          }
          .flex-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }
          .flex-right {
            display: flex;
            justify-content: flex-end;
          }
          .form {
            padding: 15px;

          }
          .fake-input {
            -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
            -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
            background-color: ${seashell};
            border-radius: 4px;
            border: 0;
            box-shadow:         inset 0 0 7px 0 ${shadows};
            font-family: ${secondaryFont};
            font-size: 16px;
            height: 60px;
            margin: auto;
            padding: 25px;
            resize: none;
            vertical-align: top;
            width: 260px;
          }
          .activity-input {
            -moz-box-shadow:    inset 0 0 7px 0 ${shadows};
            -webkit-box-shadow: inset 0 0 7px 0 ${shadows};
            background-color: ${seashell};
            border-radius: 4px;
            border: 0;
            box-shadow:         inset 0 0 7px 0 ${shadows};
            font-family: ${secondaryFont};
            font-size: 16px;
            height: 208px;
            margin: 0 auto;
            padding: 25px;
            resize: none;
            vertical-align: top;
            width: 260px;
          }

          .top-bar {
            background-color: ${astronaut};
            color: ${romance};
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
            height: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding-left: 10px;
          }

          .back {
            margin-left: 10px;
          }

          @media ${screenMedium} {
            .fake-input {
              width: 540px;
            }
            .activity-input {
              height: 393px;
              width: 628px;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default FullActivityForm;
