import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { avatarImgStyle } from './styles';

const {
  arrayOf,
  any,
  func,
  number,
  shape,
  string,
} = PropTypes;


class ReplyForm extends Component {
  static defaultProps = {
    user: {
      avatarURL: ''
    },
  }
  static propTypes = {
    submitReply: func.isRequired,
    objectId: string.isRequired,
    replyId: number.isRequired,
    threadId: number.isRequired,
    topicId: number.isRequired,
    user: shape({}),
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
      user,
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
    const { user } = this.props;
    const { replyText } = this.state;

    return (
      <div className="reply-form-container">
        <div style={avatarImgStyle(user.avatarURL)}></div>
        <form className="reply-form">
          <textarea
            onChange={this.handleOnTextChange}
            placeholder="Write a reply"
            value={replyText}
          ></textarea>
          <button onClick={this.submitForm}>Reply</button>
        </form>
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
