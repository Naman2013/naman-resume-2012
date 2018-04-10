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
      submitted: false,
      error: false,
    })
  }

  submitAnswer = (e) => {
    e.preventDefault();

    this.setState({
      submitted: false,
      error: false,
    });

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
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          submitted: true,
          replyText: '',
        });
      } else {
        this.setState({
          submitted: true,
          error: true,
        });
      }
    });
  }

  render() {
    const {
      submitted,
      error,
    } = this.state;

    return (
      <div className="reply-to-question">
        { submitted && error &&
          <div>There was an error submitting your answer.</div>
        }
        { submitted && !error &&
          <div>Answer has been submitted</div>
        }
        {(!submitted || (submitted && error)) &&
          <form>
            <input
              type="text"
              onChange={this.changeReplyText}
            />
            <button onClick={this.submitAnswer}>Answer Now</button>
          </form>
        }
        <style jsx>{`


        `}</style>
      </div>
    )
  }
}

export default ReplyToAstronomerQuestion;
