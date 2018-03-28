import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageUploadForm from './image-upload-form';
import ModalGeneric from '../common/modals/modal-generic';
import { createThread } from '../../services/discussions/create-thread';
import { avatarImgStyle } from './styles';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
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
    } = this.state;

    createThread({
      at: user.at,
      token: user.token,
      cid: user.cid,
      objectId,
      callSource: 'qanda',
      content: questionText,
      topicId,
      forumId,
    }).then((res) => {

      if (!res.data.apiError) {
        this.setState({
          showPopup: true,
          modalDescription: successMessage,
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

  render () {
    const { objectTitle } = this.props;
    const {
      questionText,
      showPopup,
      modalDescription,
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
            onChange={this.onTextChange}
            maxLength={100}
            value={questionText}
          ></textarea>
          <div>{questionText.length}/100</div>
          <ImageUploadForm />
          <div className="button-container">
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
          .button-container {
            display: flex;
            justify-content: flex-end;
          }
          .form {
            padding: 15px;
            border: 1px solid ${black};
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
