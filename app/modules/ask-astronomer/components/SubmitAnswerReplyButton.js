/***********************************
 * V4  Discussions Reply Form
 *
 *
 *
 ***********************************/
import Button from 'app/components/common/style/buttons/Button';
import { prepareReply } from 'app/services/discussions/prepare-reply';
import {
  customModalStylesBlackOverlay,
  modalStyleFullPage,
} from 'app/styles/mixins/utilities';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import FullpageForm from './Modals/FullpageForm';
import SubmitReplyFeedbackModal from './Modals/SubmitReplyFeedbackModal';
import SubmitReplyForm from './Modals/SubmitReplyForm';


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

@withTranslation
class SubmitReplyReplyButton extends Component {
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
    replyButtonText: 'Submit an Reply',
  };

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

  };

  setCommentModal = () => {
    const { modalActions, user, authorInfo, freshness, content } = this.props;
    modalActions.setModal({
      promptComponent: (
        <SubmitReplyForm
          modalActions={modalActions}
          submitForm={this.submitForm}
          user={user}
          authorInfo={authorInfo}
          freshness={freshness}
          content={content}
        />
      ),
      promptStyles: customModalStylesBlackOverlay,
    });
    modalActions.showModal();
  };

  setFullpageCommentModal = () => {
    const { modalActions, user, t } = this.props;
    modalActions.setModal({
      promptComponent: (
        <FullpageForm
          modalActions={modalActions}
          submitForm={this.submitForm}
          user={user}
          prepareCall={prepareReply}
          submitButtonText={t('AskAnAstronomer.Discuss')}
          fieldPlaceholder={t('AskAnAstronomer.ReplyPlaceholder')}
        />
      ),
      promptStyles: modalStyleFullPage,
    });
    modalActions.showModal();
  };

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

    submitForm(
      {
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
      },
      this.handleSubmitReply
    );
  };

  handleSubmitReply = data => {
    // set the AskAstronomer.js [parent] modal to say a success or error message
    const { modalActions, intl, updateQuestionsList } = this.props;

    updateQuestionsList();

    const message = `${data.responseLabel}
    <p>${data.responseText}</p>`;

    modalActions.setModal({
      promptComponent: (
        <SubmitReplyFeedbackModal
          title={data.responseTitle}
          doneButtonLabel={data.doneButtonLabel}
          modalActions={modalActions}
          message={message}
        />
      ),
      promptStyles: customModalStylesBlackOverlay,
    });
    modalActions.showModal();
  };

  render() {
    const {
      avatarURL,
      isDesktop,
      user,
      replyButtonText,
      modalActions,
      t,
    } = this.props;

    return (
      <div className="reply-form-container">
        <Button text={t('AskAnAstronomer.Reply')} onClickEvent={this.setCommentModal} />
      </div>
    );
  }
}

export default SubmitReplyReplyButton;
