import React, { PureComponent } from 'react';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import ImageClickHandler from 'app/components/common/ImageClickHandler';
import './styles.scss';

const ACTIONS = {
  SUBMIT: 'submit',
  EDIT: 'edit',
  CANCEL: 'cancel',
};
export class QuestQaAnswerForm extends PureComponent {
  render() {
    const {
      moduleData,
      onClick,
      onChange,
      qaFreeForm,
      qaFillBlanks,
      qaMultipleChoice,
      readOnly,
    } = this.props;
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
      answers,
      questions,
      moduleReadOnly,
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

        {qaFreeForm && (
          <textarea
            className="quest-qa-answer-field"
            placeholder={textInputPlaceholder}
            readOnly={textInputReadOnly}
            onChange={onChange}
            value={answerText}
            maxLength={textInputMaxChars}
          />
        )}

        {qaFillBlanks &&
          questions &&
          questions.map(question => (
            <div
              key={`qa-fill-blanks-question-${question.questionId}`}
              className="qa-fill-blanks-question"
            >
              <label htmlFor={`qa-fill-blanks-question-${question.questionId}`}>
                <span>{question.questionText}</span>
                <div
                  className={cx('qa-fill-blanks-scoring-text', {
                    'scoring-text-bold':
                      answers[question.questionIndex].scoringTextBold,
                  })}
                >
                  {answers[question.questionIndex].scoringText}
                </div>
              </label>
              <input
                className="quest-qa-answer-input-field"
                id={`qa-fill-blanks-question-${question.questionId}`}
                placeholder={textInputPlaceholder}
                readOnly={textInputReadOnly}
                onChange={e => onChange(e, question.questionIndex)}
                value={answers[question.questionIndex].answerText}
                maxLength={textInputMaxChars}
              />
            </div>
          ))}

        {qaMultipleChoice &&
          answers &&
          answers.map(answer => (
            <div
              key={`qa-multiple-choice-answer-${answer.answerId}`}
              className={`qa-multiple-choice-answer${
                moduleReadOnly ? ' disabled' : ''
              }`}
              onClick={() => onClick(answer.answerIndex, answer.answerLetter)}
              disabled={moduleReadOnly}
            >
              <div className="qa-multiple-choice-answer-item-container">
                <div className="qa-multiple-choice-answer-label">
                  <img src={answer.answerIconURL} />
                </div>
                <div className="qa-multiple-choice-answer-text">
                  {answer.answerText}
                </div>
              </div>
              <div className="qa-multiple-choice-scoring-text">
                {answer.scoringText}
              </div>
            </div>
          ))}

        <div className="quest-qa-answer-actions">
          {showSubmitButton && (
            <Button
              className="quest-qa-answer-submit-btn"
              onClick={() => onClick(ACTIONS.SUBMIT)}
              disabled={readOnly}
            >
              {submitButtonCaption}
            </Button>
          )}
          {showEditButton && (
            <Button
              className="quest-qa-answer-edit-btn"
              onClick={() => onClick(ACTIONS.EDIT)}
              disabled={readOnly}
            >
              {editButtonCaption}
            </Button>
          )}
          {showCancelButton && (
            <Button
              className="quest-qa-answer-cancel-btn"
              onClick={() => onClick(ACTIONS.CANCEL)}
              disabled={readOnly}
            >
              {cancelButtonCaption}
            </Button>
          )}
        </div>
      </div>
    );
  }
}
