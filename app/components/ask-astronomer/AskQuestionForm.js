/***********************************
* V4 Ask Astronomer Question Form
***********************************/

import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ModalGeneric from '../common/modals/modal-generic';
import { Modal } from 'react-bootstrap';
import { createThread } from '../../services/discussions/create-thread';
import { prepareThread } from '../../services/discussions/prepare-thread';
import GenericButton from '../common/style/buttons/Button';
import PhotoUploadButton from '../common/style/buttons/PhotoUploadButton';
import deletePostImage from '../../services/post-creation/delete-post-image';
import setPostImages from '../../modules/set-post-images';
import style from './AskQuestionForm.style';

const {
  string,
} = PropTypes;

const successMessage = (<div className="container">
  <div className="title">Success!</div>
  <div className="subtitle">Your question has been submitted for review.</div>
  <p>We’ll send you an alert when your Question has been answered by one or more of our Astronomers.</p>
  <p>You can also find all of your recently answered questions in your “You’ve Got Answers” section on your Profile page.</p>
  <style jsx>{`
    .container {
      text-align: left;
      width: 100%;
    }
    .title {
      font-weight: bold;
    }
    .subtitle {
      font-weight: bold;
    }
  `}</style>
</div>);

class AskAstronomerQuestionForm extends Component {
  static propTypes = {
    objectTitle: string,
    objectId: string,
  }
  static defaultProps = {
    objectTitle: '',
    objectId: '',
  }

  state = {
    questionText: '',
    showPopup: false,
    modalDescription: null,
    uuid: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
    specialists: [],
  }

  componentDidMount() {
    const {
      user,
      objectId,
      hideModal,
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
      questionText: e.target.value,
    })
  }

  submitForm = (e) => {
    const {
      objectId,
      topicId,
      forumId,
      user,
    } = this.props;

    const {
      questionText,
      S3URLs,
    } = this.state;

    createThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
      objectId,
      S3URLs,
      callSource: 'qanda',
      content: questionText,
      topicId,
      forumId,
    }).then((res) => {

      if (!res.data.apiError) {
        this.setState({
          showPopup: true,
          modalDescription: successMessage,
          questionText: '',
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

  clickHideHandler = () => {
    this.props.hideModal();
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
      cid, token, at, uniqueId: uuid, imageClass, imageURL
    }).then(result => this.handleUploadImageResponse(result.data));
  }

  handleUploadImageResponse = (uploadFileData) => {
    this.setState({
      S3URLs: uploadFileData.S3URLs,
      uploadLoading: false,
    });
  }

  render () {
    const { objectTitle, open, hideModal } = this.props;
    const {
      questionText,
      showPopup,
      modalDescription,
      uploadError,
      uploadLoading,
    } = this.state;

    return (
      <Modal
        show={open}
        className={`ask-modal`}
      >
      <div className="container">
        <div className="question-title">
          Ask an Astronomer
        </div>
        <form className="form">
          <textarea
            className="question-input"
            onChange={this.onTextChange}
            maxLength={260}
            value={questionText}
            placeholder="Type your question here"
          />
          <div className="counter">{questionText.length}/260</div>
          <div className="btn-row">
            <PhotoUploadButton 
              text="+ Photo" 
              handleUploadImage="this.handleUploadImage"
            />
            <div className="guide-link">
              <Link to="/help/posting-guidelines" className="styld">Guidelines</Link>
            </div>
            <div className="flex-right">
              <GenericButton onClickEvent={this.clickHideHandler} text="Cancel" />
              &nbsp;
              <GenericButton onClickEvent={this.submitForm} text="Submit" />
            </div>
          </div>
        </form>
        <ModalGeneric
          open={showPopup}
          closeModal={this.closeModal}
          description={modalDescription}
        />
        <style jsx>{style}</style>
      </div>
      </Modal>
    )
  }
}

export default AskAstronomerQuestionForm;
