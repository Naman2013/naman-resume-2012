import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import ModalGeneric from '../common/modals/modal-generic';
import { createThread } from '../../services/discussions/create-thread';
import { prepareThread } from '../../services/discussions/prepare-thread';
import deletePostImage from '../../services/post-creation/delete-post-image';
import setPostImages from '../../modules/set-post-images';

import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white } from '../../styles/variables/colors';

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
  }
  static defaultProps = {
    objectTitle: ''
  }

  state = {
    questionText: '',
    showPopup: false,
    modalDescription: null,
    uuid: null,
    uploadError: null,
    uploadLoading: false,
    S3URLs: [],
  }

  componentDidMount() {
    const { user } = this.props;

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
    })
  }
  onTextChange = (e) => {
    this.setState({
      questionText: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault();
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
    const { objectTitle } = this.props;
    const {
      questionText,
      showPopup,
      modalDescription,
      uploadError,
      uploadLoading,
    } = this.state;
    // const avatarStyle = Object.assign(avatarImgStyle(), { height: '50px', width: '50px'});
    return (
      <div>
        <div className="header">
          <h4>{`Don't see an answer?`}</h4>
          <h3>Ask an Astronomer</h3>
        </div>
        <form className="form">
          <div className="avatars"></div>
          <div>{`We've got a community of experts on Slooh to help you learn about space. Have a question about ${objectTitle}? Ask an Astronomer today!`}</div>
          <textarea
            className="question-input"
            onChange={this.onTextChange}
            maxLength={100}
            value={questionText}
          ></textarea>
          <div className="flex-right">{questionText.length}/100</div>
          <div className="image-upload">
            <input
              type="file"
              className="upload-button"
              onChange={this.handleUploadImage}
              accept="image/*"
            />
            {uploadError && <span className="errorMsg">{uploadError}</span>}
            {(!uploadError && uploadLoading) && <div className="fa fa-spinner" />}
            <span><Link to="/help/posting-guidelines">Guidelines</Link></span>
          </div>
          <div className="flex-right">
            <button type="button" className="question-button" onClick={this.submitForm}>Submit Your Question</button>
          </div>
        </form>
        <ModalGeneric
          open={showPopup}
          closeModal={this.closeModal}
          description={modalDescription}
        />
        <style jsx>{`
          .header {
            font-weight: bold;
          }
          .flex-right {
            display: flex;
            justify-content: flex-end;
          }
          .form {
            padding: 15px;
            border: 1px solid ${black};
          }
          .question-input {
            border-width: 1px;
            height: 75px;
            width: 325px;
            padding: 15px;
            vertical-align: top;
            margin: 10px;
          }
          .question-button {
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

export default AskAstronomerQuestionForm;
