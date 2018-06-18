/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { profPic } from './styles';
import { darkBlueGray, white } from 'styles/variables/colors';

const {
  arrayOf,
  any,
  bool,
  func,
  number,
  oneOfType,
  shape,
  string,
} = PropTypes;


class ReplyForm extends Component {
  static defaultProps = {
    avatarURL: '',
    disableButton: false,
    submitted: false,
    replyTo: null,
    callSource: null,
    user: {
      at: null,
      cid: null,
      token: null,
    },
    forumId: null,
    showSubmitError: false,
    showSubmitLoader: false,
  }
  static propTypes = {
    avatarURL: string,
    disableButton: bool,
    showSubmitError: bool,
    showSubmitLoader: bool,
    submitReply: func.isRequired,
    submitted: bool,
    callSource: string,
    threadId: oneOfType([number, string]).isRequired,
    topicId: oneOfType([number, string]).isRequired,
    forumId: oneOfType([number, string]),
    replyTo: oneOfType([number, string]),
    user: shape({
      at: oneOfType([number, string]),
      token: oneOfType([number, string]),
      cid: oneOfType([number, string]),
    }),
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
      callSource,
      replyTo,
      submitReply,
      threadId,
      forumId,
      topicId,
      user,
    } = this.props;
    const { replyText } = this.state;

    submitReply({
      content: replyText,
      threadId,
      topicId,
      forumId,
      replyTo,
      at: user.at,
      token: user.token,
      cid: user.cid,
      callSource,
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
        {(submitted && showSubmitError) && <div>There was an error submitting this form.</div>}
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
