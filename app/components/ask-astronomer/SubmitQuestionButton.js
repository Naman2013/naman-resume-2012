/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import RevealSubmitForm from 'components/common/RevealSubmitForm';
import { romance, astronaut, shadows } from 'styles/variables/colors_tiles_v4';
import { dropShadowContainer } from 'styles/mixins/utilities';
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';

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


class SubmitButtonQues extends Component {
  static defaultProps = {
    avatarURL: '',
    replyTo: null,
    callSource: null,
    user: {
      at: null,
      cid: null,
      token: null,
    },
    forumId: null,
    replyButtonText: 'Submit an Answer',
  }
  static propTypes = {
    avatarURL: string,
    submitReply: func.isRequired,
    replyButtonText: string,
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


  submitForm = (content, S3URLs, callback) => {
    const {
      callSource,
      replyTo,
      submitReply,
      threadId,
      forumId,
      topicId,
      user,
    } = this.props;

    submitReply({
      content,
      S3URLs,
      threadId,
      topicId,
      forumId,
      replyTo,
      at: user.at,
      token: user.token,
      cid: user.cid,
      callSource,
    }, (data) => this.handleSubmitReply(data, callback));
  }

  handleSubmitReply = (data) => {
    // set the AskAstronomer.js [parent] modal to say a success or error message
    const { modalActions } = this.props;
    console.log('data', data)
    modalActions.setModal({
      promptComponent: <div>testing 1 2 3</div>,
      promptStyles: customModalStylesBlackOverlay,
    })
  }

  render() {
    const {
      avatarURL,
      isDesktop,
      user,
      replyButtonText,
    } = this.props;

    return (
      <div className="reply-form-container">
        <RevealSubmitForm
          {...this.props}
          submitForm={this.submitForm}
          placeholder="Write a public comment"
          revealButtonRender={btnProps => <Button text={replyButtonText} onClickEvent={btnProps.displayForm} />}
        />
      </div>
    );
  }
}

export default SubmitButtonQues;
