import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericButton from 'components/common/style/buttons/Button';
import { customModalStylesBlackOverlay } from 'styles/mixins/utilities';
import SubmitQuestionForm from './Modals/SubmitQuestionForm';
import SubmitQuestionFeedbackModal from './Modals/SubmitQuestionFeedbackModal';
import style from './AskQuestionTile.style';

const {
  func,
  shape,
} = PropTypes;

class AskQuestionTile extends Component {
  static propTypes = {
    modalActions: shape({
      closeModal: func,
      setModal: func,
      showModal: func,
    }).isRequired,
  }

  static defaultProps = {
  }

  state = {

  };

  get questionForm () {
    const {
      modalActions,
      user,
      askQuestionInfo,
    } = this.props;
    return (<SubmitQuestionForm
      modalActions={modalActions}
      submitForm={this.submitForm}
      user={user}
      {...askQuestionInfo}

    />);
  }

  setAskQuestionModal = (e) => {
    e.preventDefault();
    const {
      modalActions,
    } = this.props;
    modalActions.setModal({
      promptComponent: this.questionForm,
      promptStyles: customModalStylesBlackOverlay,
    });
    modalActions.showModal();
  }

  submitForm = (content, S3URLs) => {
    const {
      submitQuestion,
      askQuestionInfo: { topicId, objectId },
      user,
    } = this.props;

    submitQuestion({
      content,
      S3URLs,
      objectId,
      topicId,
      at: user.at,
      token: user.token,
      cid: user.cid,
      callSource: 'qanda',
    }, (data) => this.handleSubmitReply(data));
  }

  handleSubmitReply = (data) => {
    const { modalActions } = this.props;
    const message = `${data.responseLabel}
    <p>${data.responseText}</p>`;
    modalActions.setModal({
      promptComponent: <SubmitQuestionFeedbackModal
        title={data.responseTitle}
        doneButtonLabel={data.doneButtonLabel}
        continueButtonLabel={data.continueButtonLabel}
        modalActions={modalActions}
        promptText={message}
        requestQuestion={this.setAskQuestionModal}
      />,
      promptStyles: customModalStylesBlackOverlay,
    })
  }


  render() {
    const {
      askPrompt,
      infoText,
      modalActions,
      promptIconUrl,
      subTitle,
      title,
    } = this.props;
    return (
      <Fragment>
        <div className="ask-question-tile">
          <div className="ask-question-text">
            <span className="dek" dangerouslySetInnerHTML={{ __html: title }} />
            <h2 dangerouslySetInnerHTML={{ __html: subTitle }} />
            <p dangerouslySetInnerHTML={{ __html: infoText }} />
            <GenericButton onClickEvent={this.setAskQuestionModal} text={askPrompt} icon={promptIconUrl} />
          </div>
          <div className="icon-container">
            <div className="border">
              <div className="icon">
                <img className="icon-content" alt="" src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png" />
              </div>
            </div>
          </div>
        </div>
        <style jsx>{style}</style>
      </Fragment>
    )
  }
}

export default AskQuestionTile;
