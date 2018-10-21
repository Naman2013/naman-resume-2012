/***********************************
* V4 Ask Astronomer Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { avatarImgStyle } from './styles';
import { astronaut, romance } from '../../styles/variables/colors_tiles_v4';
import { secondaryFont } from '../../styles/variables/fonts';
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
        {showSubmitLoader && <div className="fa fa-spinner loader" />}
        {submitted && <span className="fa fa-check loader" /> }
        {!showSubmitLoader && !submitted && <form className="reply-form">
          <div>
            <div style={avatarImgStyle(avatarURL)}></div>
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
            Reply
          </button>}
        </form>}
        <style jsx>{`
          .reply-form-container {
            padding: 15px;
            margin-left: 25px;
            background-color: ${romance};
          }

          .reply-form {
            display: inline-block;
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
            background-color: ${astronaut};
            padding: 5px 10px;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 10px;
            color: ${romance};
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
