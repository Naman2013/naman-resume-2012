/***********************************
* V4 Ask Astronomer Question Form
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ModalGeneric from '../../common/modals/modal-generic';
import { createThread } from '../../../services/discussions/create-thread';
import { prepareThread } from '../../../services/discussions/prepare-thread';
import deletePostImage from '../../../services/post-creation/delete-post-image';
import setPostImages from '../../../modules/set-post-images';
import { black, darkBlueGray, white } from '../../../styles/variables/colors';
import { dropShadowedContainer } from '../styles';

const {
  bool,
  number,
  string,
} = PropTypes;

class ActivityForm extends Component {
  static propTypes = {
    topicId: number,
    forumId: number,
    canPost: bool,
    placeholder: string,
  }
  static defaultProps = {
    topicId: 0,
    forumId: 0,
    canPost: false,
    placeholder: 'Tell us something...'
  }

  state = {
    activityText: '',
    showPopup: false,
    modalDescription: null,
    uuid: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
  }

  componentDidMount() {
    const {
      user,
    } = this.props;

    prepareThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          uuid: res.data.postUUID,
        })
      }
    });
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

    createThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
      S3URLs,
      callSource: 'groups',
      content: activityText,
      topicId,
      forumId,
    }).then((res) => {
      if (!res.data.apiError) {
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

  closeModal = (e) => {
    this.setState({
      showPopup: false,
    });
  }

  handleUploadImage = (event) => {
    event.preventDefault();

    const { cid, token, at } = this.props.user;
    const { uuid } = this.state;
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
    } = this.props;

    const {
      activityText,
      showPopup,
      modalDescription,
      uploadError,
      uploadLoading,
    } = this.state;

    return (
      <div className="form-container">
        <form className="form">
          <textarea
            className="activity-input"
            onChange={this.onTextChange}
            maxLength={100}
            value={activityText}
            placeholder={placeholder}
          />
          <div className="flex-right">{activityText.length}/100</div>
          <div className="image-upload">
            <input
              type="file"
              className="upload-button"
              onChange={this.handleUploadImage}
              accept="image/*"
            />
            {uploadError && <span className="errorMsg">{uploadError}</span>}
            {(!uploadError && uploadLoading) && <div className="fa fa-spinner" />}
            <span>
              <Link to="/help/posting-guidelines">Guidelines</Link>
            </span>
          </div>
          <div className="flex-right">
            {canPost ?
              <button type="button" className="activity-button" onClick={this.submitForm}>Post</button> :
              <button type="button" className="activity-button" onClick={joinOrLeaveGroup}>Join to make a post</button>
            }
          </div>
        </form>
        <ModalGeneric
          open={showPopup}
          closeModal={this.closeModal}
          description={modalDescription}
        />
        <style jsx>{`
          .form-container {
            background-color: ${white};
            ${dropShadowedContainer}
          }
          .flex-right {
            display: flex;
            justify-content: flex-end;
          }
          .form {
            padding: 15px;

          }
          .activity-input {
            border-width: 1px;
            height: 75px;
            width: 325px;
            padding: 15px;
            vertical-align: top;
            margin: 10px;
          }
          .activity-button {
            display: block;
            width: 100px;
            background-color: ${darkBlueGray};
            padding: 5px 10px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 10px;
            color: ${white};
            margin-top: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default ActivityForm;
