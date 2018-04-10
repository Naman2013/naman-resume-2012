import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitReply } from '../../services/discussions/submit-reply';
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

class ReplyToAstronomerQuestion extends Component {
  static defaultProps = {
  }

  static propTypes = {
    objectId: number.isRequired,
    threadId: number.isRequired,
    topicId: number.isRequired,
  }

  state = {
    replyText: '',
  }

  constructor(props) {
    super(props)

  }

  changeReplyText = (e) => {
    e.preventDefault();
    this.setState({
      replyText: e.target.value,
    })
  }

  submitAnswer = (e) => {
    e.preventDefault();
    const {
      objectId,
      threadId,
      topicId,
    } = this.props;

    const {
      replyText,
    } = this.state;

    submitReply({
      callSource: 'qanda',
      content: replyText,
      objectId,
      replyTo: threadId,
      threadId,
      topicId,
    });
  }

  render() {
    const {
    } = this.props;

    return (
      <form className="reply-to-question">
        <input
          type="text"
          onChange={this.changeReplyText}
        />
        <button onClick={this.submitAnswer}>Answer Now</button>
        <style jsx>{`


        `}</style>
      </form>
    )
  }
}

export default ReplyToAstronomerQuestion;
