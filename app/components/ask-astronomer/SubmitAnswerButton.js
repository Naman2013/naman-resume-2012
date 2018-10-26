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
import SubmitAnswerFeedbackModal from './Modals/SubmitAnswerFeedbackModal';
import SubmitAnswerForm from './Modals/SubmitAnswerForm';
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


class SubmitAnswerButton extends Component {
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
    submitForm: func.isRequired,
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

  setAnswerModal = () => {
    const { modalActions, user, authorInfo, freshness, content } = this.props;
    modalActions.setModal({
      promptComponent: (<SubmitAnswerForm
        modalActions={modalActions}
        submitForm={this.submitForm}
        user={user}
        authorInfo={authorInfo}
        freshness={freshness}
        content={content}
      />),
      promptStyles: customModalStylesBlackOverlay,
    })
    modalActions.showModal();
  }


  submitForm = (content, S3URLs) => {
    const {
      callSource,
      replyTo,
      submitForm,
      threadId,
      forumId,
      topicId,
      user,
    } = this.props;

    submitForm({
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
    }, (data) => this.handleSubmitReply(data));
  }

  handleSubmitReply = (data) => {
    // set the AskAstronomer.js [parent] modal to say a success or error message
    const { modalActions } = this.props;
    const message = data.apiError ? `Error!
    <p>There was an issue submitting your reply.</p>` : `Success!
    <p>You answer has been submitted!</p>`;
    modalActions.setModal({
      promptComponent: <SubmitAnswerFeedbackModal modalActions={modalActions} message={message} />,
      promptStyles: customModalStylesBlackOverlay,
    })
  }

  render() {
    const {
      avatarURL,
      isDesktop,
      user,
      replyButtonText,
      modalActions,
    } = this.props;

    return (
      <div className="reply-form-container">
        <Button text="Submit an Answer" onClickEvent={this.setAnswerModal} />
      </div>
    );
  }
}

export default SubmitAnswerButton;
