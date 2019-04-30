/***********************************
 * V4  Discussions Reply Form
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import Button from 'app/components/common/style/buttons/Button';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import FullpageForm from './Modals/FullpageForm';
import SubmitReplyFeedbackModal from './Modals/SubmitReplyFeedbackModal';
import SubmitReplyForm from './Modals/SubmitReplyForm';
import { prepareReply } from 'app/services/discussions/prepare-reply';
import {
  customModalStylesBlackOverlay,
  modalStyleFullPage,
} from 'app/styles/mixins/utilities';
import messages from './SubmitAnswerButton.messages';

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
    intl: intlShape.isRequired,
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
    const { modalActions, user, intl } = this.props;
    modalActions.setModal({
      promptComponent: (
        <FullpageForm
          modalActions={modalActions}
          submitForm={this.submitForm}
          user={user}
          prepareCall={prepareReply}
          submitButtonText={intl.formatMessage(messages.Discuss)}
          fieldPlaceholder={intl.formatMessage(messages.ReplyPlaceholder)}
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
      data => this.handleSubmitReply(data)
    );
  };

  handleSubmitReply = data => {
    // set the AskAstronomer.js [parent] modal to say a success or error message
    const { modalActions, intl, updateQuestionsList } = this.props;
    const message = `${data.responseLabel}
    <p>${data.responseText}</p>`;

    modalActions.setModal({
      promptComponent: (
        <SubmitReplyFeedbackModal
          title={data.responseTitle}
          doneButtonLabel={data.doneButtonLabel}
          modalActions={modalActions}
          message={message}
          updateQuestionsList={updateQuestionsList}
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
      intl,
    } = this.props;

    return (
      <div className="reply-form-container">
        <DisplayAtBreakpoint screenMedium screenLarge screenXLarge>
          <Button
            text={intl.formatMessage(messages.Reply)}
            onClickEvent={this.setCommentModal}
          />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall>
          <Button
            text={intl.formatMessage(messages.Reply)}
            onClickEvent={this.setFullpageCommentModal}
          />
        </DisplayAtBreakpoint>
      </div>
    );
  }
}

export default injectIntl(SubmitReplyReplyButton);
