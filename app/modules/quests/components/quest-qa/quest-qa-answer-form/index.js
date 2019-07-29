import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import './styles.scss';

export class QuestQaAnswerForm extends PureComponent {
  render() {
    const {
      imageUrl,
      thumbnailUrl,
      answerFieldPrompt,
      readOnly,
      placeholder,
      submitButtonCaption,
      showSubmitButton,
      onClick,
    } = this.props;

    return (
      <div className="quest-qa-answer-form">
        {imageUrl && (
          <div className="quest-qa-answer-image">
            <ImageClickHandler imageUrl={imageUrl}>
              <img src={thumbnailUrl} />
            </ImageClickHandler>
          </div>
        )}

        <div className="quest-qa-answer-prompt">{answerFieldPrompt}</div>

        <textarea
          className="quest-qa-answer-field"
          placeholder={placeholder}
          readOnly={readOnly}
        />

        <div className="quest-qa-answer-actions">
          {showSubmitButton && (
            <Button
              className="quest-qa-answer-submit-btn"
              onClick={() => onClick('submit')}
            >
              {submitButtonCaption}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
