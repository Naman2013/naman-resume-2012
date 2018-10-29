import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import GenericButton from 'components/common/style/buttons/Button';
import { customModalStylesBlackOverlay, profilePhotoStyle } from 'styles/mixins/utilities';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import SubmitQuestionForm from './Modals/SubmitQuestionForm';
import SubmitQuestionFeedbackModal from './Modals/SubmitQuestionFeedbackModal';
import { info } from 'styles/variables/iconURLs';

const circlePic = photoUrl => Object.assign(profilePhotoStyle(photoUrl), {
  height: '105px',
  width: '105px',
  backgroundSize: 'cover',
});
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

  setInfoModal = (e) => {
    e.preventDefault();
    const {
      infoText,
      modalActions,
    } = this.props;
    modalActions.setModal({
      promptComponent: <div dangerouslySetInnerHTML={{ __html: infoText}} />,
      promptStyles: customModalStylesBlackOverlay,
    });
    modalActions.showModal();
  }

  submitForm = (content, S3URLs) => {
    const {
      submitQuestion,
      askQuestionInfo: { topicId, objectId },
    } = this.props;

    submitQuestion({
      content,
      S3URLs,
      objectId,
      topicId,
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
      imageURL,
      modalActions,
      promptIconUrl,
      subTitle,
      title,
    } = this.props;
    return (
      <Fragment>
        <DisplayAtBreakpoint screenLarge screenXLarge>
          <div className="ask-question-tile">
            <div className="ask-question-text">
              <span className="dek" dangerouslySetInnerHTML={{ __html: title }} />
              <h2 dangerouslySetInnerHTML={{ __html: subTitle }} />
              <p dangerouslySetInnerHTML={{ __html: infoText }} />
            </div>
            <span className="icon-line-horz" />
            <div className="icon-container flex-item">
              <div className="vert-line" />
              <div className="icon-container-circle">
                <div className="circle-icon-line">
                  <div className="icon" style={circlePic(imageURL)} />
                </div>
              </div>
            </div>
            <span className="icon-line-horz" />
            <div className="button-contain">
              <GenericButton onClickEvent={this.setAskQuestionModal} text={askPrompt} icon={promptIconUrl} theme={{ width: '175px' }} />
              <GenericButton onClickEvent={this.setInfoModal} icon={info} theme={{ height: '40px', width: '40px' }} />
            </div>
          </div>
        </DisplayAtBreakpoint>
        <DisplayAtBreakpoint screenSmall screenMedium>
        <div className="ask-question-tile">
          <div className="ask-question-text">
            <span className="dek" dangerouslySetInnerHTML={{ __html: title }} />
            <h2 dangerouslySetInnerHTML={{ __html: subTitle }} />
            <p dangerouslySetInnerHTML={{ __html: infoText }} />
            <div className="button-contain">
              <GenericButton onClickEvent={this.setAskQuestionModal} text={askPrompt} icon={promptIconUrl} theme={{ width: '175px' }} />
              <GenericButton onClickEvent={this.setInfoModal} icon={info} theme={{ height: '40px', width: '40px' }} />
            </div>
          </div>
          <div className="icon-container">
            <div className="border">
              <div className="icon">
                <img className="icon-content" alt="" src="https://vega.slooh.com/assets/v4/common/ask_mobile_bg.png" />
              </div>
            </div>
          </div>
        </div>
        </DisplayAtBreakpoint>
        <style jsx>{style}</style>
      </Fragment>
    )
  }
}

export default AskQuestionTile;
