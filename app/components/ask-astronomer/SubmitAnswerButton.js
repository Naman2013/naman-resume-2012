/***********************************
* V4  Discussions Reply Form
*
*
*
***********************************/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/style/buttons/Button';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import FullpageForm from './Modals/FullpageForm';
import SubmitAnswerFeedbackModal from './Modals/SubmitAnswerFeedbackModal';
import SubmitAnswerForm from './Modals/SubmitAnswerForm';
import { prepareReply } from 'services/discussions/prepare-reply';
import { customModalStylesBlackOverlay, modalStyleFullPage } from 'styles/mixins/utilities';

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
    const {
      modalActions,
      user,
      authorInfo,
      freshness,
      content,
    } = this.props;
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

  setFullpageAnswerModal = () => {
    const {
      modalActions,
      user,
      authorInfo,
      freshness,
      content,
    } = this.props;
    modalActions.setModal({
      promptComponent: (<FullpageForm
        modalActions={modalActions}
        submitForm={this.submitForm}
        user={user}
        prepareCall={prepareReply}
        submitButtonText="Reply"
        fieldPlaceholder="Write your answer"
      />),
      promptStyles: modalStyleFullPage,
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
        <DisplayAtBreakpoint
          screenMedium
          screenLarge
          screenXLarge
        >
          <Button text="Submit an Answer" onClickEvent={this.setAnswerModal} />
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint
          screenSmall
        >
          <Button text="Submit an Answer" onClickEvent={this.setFullpageAnswerModal} />
        </DisplayAtBreakpoint>

      </div>
    );
  }
}

export default SubmitAnswerButton;
