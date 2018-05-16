/***********************************
* V4 Activity Comment Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { profPic } from '../styles';
import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';
const {
  arrayOf,
  any,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;


class ReplyForm extends Component {
  static defaultProps = {
    avatarURL: '',
    disableButton: false,
    submitted: false,
    replyTo: null,
  }
  static propTypes = {
    avatarURL: string,
    disableButton: bool,
    showSubmitError: bool,
    showSubmitLoader: bool,
    submitReply: func.isRequired,
    submitted: bool,
    threadId: number.isRequired,
    topicId: number.isRequired,
    replyTo: number,
  }

  state = {
    replyText: '',
  };

  handleOnTextChange = (e) => {
    this.setState({
      replyText: e.target.value,
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    const {
      handleSubmit,
      reply,
      threadId,
      topicId,
      replyTo,
      submitReply,
    } = this.props;
    const { replyText } = this.state;

    submitReply({
      content: replyText,
      threadId,
      topicId,
      replyTo,
    });

  }

  render() {
    const {
      avatarURL,
      disableButton,
      showSubmitError,
      showSubmitLoader,
      submitted,
    } = this.props;
    const {
      replyText,
    } = this.state;
    return (
      <div className="reply-form-container">
        {showSubmitLoader && <div className="fa fa-spinner loader" />}
        {submitted && <span className="fa fa-check loader" /> }
        {!showSubmitLoader && !submitted && <form className="reply-form">
          <div className="input-container">
            <div style={profPic(avatarURL)}></div>
            <textarea
              className="reply-input"
              onChange={this.handleOnTextChange}
              placeholder="Write a reply"
              value={replyText}
            ></textarea>
          </div>
          {!disableButton && <button
            className="reply-button"
            onClick={this.submitForm}
            disable={disableButton.toString()}
          >
            Comment
          </button>}
        </form>}
        <style jsx>{`
          .reply-form-container {
            padding: 15px;
            margin-left: 25px;
          }

          .reply-form {
            display: inline-block;
          }

          .input-container {
            display: flex;
          }

          .reply-input {
            border-width: 1px;
            height: 75px;
            width: 500px;
            padding: 15px;
            vertical-align: top;
            margin: 0 10px;
          }

          .reply-button {
            float: right;
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

          .loader {
            display: block;
            text-align: center;
            font-size: 12px;
          }
        `}</style>
      </div>
    );
  }
}

export default ReplyForm;
