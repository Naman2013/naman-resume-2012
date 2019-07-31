import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import './styles.scss';

export class QuestQaAnswerForm extends PureComponent {
  render() {
    const { moduleData, onClick, onChange } = this.props;
    const {
      moduleBaseImageURL,
      moduleBaseThumbnailURL,
      activityPrompt,
      textInputReadOnly,
      textInputPlaceholder,
      submitButtonCaption,
      showSubmitButton,
      showEditButton,
      editButtonCaption,
      showCancelButton,
      cancelButtonCaption,
      answerText,
      textInputMaxChars,
    } = moduleData;

    return (
      <div className="quest-qa-answer-form">
        {moduleBaseImageURL && (
          <div className="quest-qa-answer-image">
            <ImageClickHandler imageUrl={moduleBaseImageURL}>
              <img src={moduleBaseThumbnailURL} />
            </ImageClickHandler>
          </div>
        )}

        <div className="quest-qa-answer-prompt">{activityPrompt}</div>

        <textarea
          className="quest-qa-answer-field"
          placeholder={textInputPlaceholder}
          readOnly={textInputReadOnly}
          onChange={onChange}
          value={answerText}
          maxlength={textInputMaxChars}
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
          {showEditButton && (
            <Button
              className="quest-qa-answer-edit-btn"
              onClick={() => onClick('edit')}
            >
              {editButtonCaption}
            </Button>
          )}
          {showCancelButton && (
            <Button
              className="quest-qa-answer-cancel-btn"
              onClick={() => onClick('cancel')}
            >
              {cancelButtonCaption}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
