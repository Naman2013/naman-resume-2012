import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { avatarImgStyle } from './styles';

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
  }
  static propTypes = {
    avatarURL: string,
    disableButton: bool,
    objectId: string.isRequired,
    replyId: number.isRequired,
    showSubmitError: bool,
    showSubmitLoader: bool,
    submitReply: func.isRequired,
    submitted: bool,
    threadId: number.isRequired,
    topicId: number.isRequired,
  }

  constructor(props) {
    super(props);
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
      objectId,
      reply,
      replyId,
      threadId,
      topicId,
      submitReply,
    } = this.props;
    const { replyText } = this.state;

    submitReply({
      content: replyText,
      objectId,
      replyTo: replyId,
      threadId,
      topicId,
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
        <div style={avatarImgStyle(avatarURL)}></div>
        {showSubmitLoader && <div className="fa fa-spinner" />}
        {submitted && <span className="fa fa-check" /> }
        {!showSubmitLoader && !submitted && <form className="reply-form">
          <textarea
            onChange={this.handleOnTextChange}
            placeholder="Write a reply"
            value={replyText}
          ></textarea>
          {!disableButton && <button
            onClick={this.submitForm}
            disable={disableButton.toString()}
          >
            Reply
          </button>}
        </form>}
        <style jsx>{`
          .reply-form-container {
            margin-left: 15px;
            border: 1px solid black;
          }

          .reply-form {
            display: inline-block;
          }
        `}</style>
      </div>
    );
  }
}

export default ReplyForm;
