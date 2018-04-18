import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { submitReply } from '../../../services/discussions/submit-reply';
import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

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
    user: {},
  }

  static propTypes = {
    objectId: number.isRequired,
    threadId: number.isRequired,
    topicId: number.isRequired,
    user: shape({
      at: string.isRequired,
      token: string.isRequired,
      cid: string.isRequired,
    }),
  }

  state = {
    error: false,
    loading: false,
    replyText: '',
    submitted: false,
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

    this.setState({
      submitted: false,
      error: false,
      loading: true,
    });

    const {
      objectId,
      threadId,
      topicId,
      user,
    } = this.props;

    const {
      replyText,
    } = this.state;

    submitReply({
      at: user.at,
      callSource: 'qanda',
      cid: user.cid,
      content: replyText,
      objectId,
      replyTo: threadId,
      threadId,
      token: user.token,
      topicId,
    }).then((res) => {
      if (!res.data.apiError) {
        this.setState({
          loading: false,
          replyText: '',
          submitted: true,
        });
      } else {
        this.setState({
          error: true,
          loading: false,
          submitted: true,
        });
      }
    });
  }

  render() {
    const {
      error,
      loading,
      submitted,
      replyText,
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
            <textarea
              type="text"
              onChange={this.changeReplyText}
              value={replyText}
              placeholder="Type your answer here"
            />
            {loading && <span className="fa fa-spinner" />}
            {!loading && <button className="block" onClick={this.submitAnswer}>Answer Now</button>}
          </form>
        }
        <style jsx>{`
          display: block;

        `}</style>
      </div>
    )
  }
}

export default ReplyToAstronomerQuestion;
