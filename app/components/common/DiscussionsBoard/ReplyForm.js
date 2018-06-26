/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { profPic } from './styles';
import { darkBlueGray, white, darkGray, gray } from 'styles/variables/colors';

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
            <div className="comment-title-container">
              <div className="comment-title-avatar-container">
                <div className="comment-title-avatar" style={Object.assign({ margin: '0 auto' }, profPic(avatarURL))} />
              </div>
              <div className="comment-title-text">Write a Public Comment</div>
            </div>
            <div className="reply-input-container">
              <textarea
                className="reply-input"
                onChange={this.handleOnTextChange}
                placeholder="Write a reply"
                value={replyText}
              ></textarea>
            </div>
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
            margin: 25px;
            -moz-box-shadow: 0 2px 4px 1px ${gray};
            -webkit-box-shadow: 0 2px 4px 1px ${gray};
            box-shadow: 0 2px 4px 1px ${gray};
          }

          .reply-form {
            width: 100%;
            display: inline-block;
          }

          .reply-form, .loader {
            padding: 25px;
          }


          .loader {
            display: block;
            text-align: center;
            font-size: 12px;
          }

          .comment-title-container {
            display: flex;
            flex-direction: row;
          }
          .comment-title-avatar-container {
            flex: 1;
            padding: 25px;
            border-top: 1px solid ${gray};
            border-bottom: 1px solid ${gray};
            border-left: 1px solid ${gray};
          }
          .comment-title-text {
            display: flex;
            align-items: center;
            flex: 3;
            font-weight: bold;
            font-size: 12px;
            text-transform: uppercase;
            padding: 25px;
            border-top: 1px solid ${gray};
            border-bottom: 1px solid ${gray};
            border-left: 1px solid ${gray};
            border-top: 1px solid ${gray};
            border-right: 1px solid ${gray};
          }

          .reply-input-container {
            width: 100%;
            margin: 25px 0;
          }
          .reply-input {
            resize: none;
            display: block;
            width: 100%;
            padding: 15px;
            background-color: ${gray};
            -moz-box-shadow: 0 2px 4px 1px ${gray};
            -webkit-box-shadow: 0 2px 4px 1px ${gray};
            box-shadow: 0 2px 4px 1px ${gray};
            border: 1px solid ${gray};
            outline: none;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          .reply-button {
            display: block;
            border: 1px dotted ${darkGray};
            border-radius: 100px;
            background-color: ${white};
            color: ${darkGray};
            width: 110px;
            margin: 15px 0;
            font-size: 11px;
            font-weight: bold;
            padding: 5px 0;
            text-transform: uppercase;
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }
}

export default ReplyForm;
