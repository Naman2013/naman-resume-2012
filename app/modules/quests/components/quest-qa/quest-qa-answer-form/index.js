import ImageClickHandler from 'app/components/common/ImageClickHandler';
import RichTextEditor from 'app/components/rich-text-editor/RichTextEditor';
import cx from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Tooltip } from 'react-tippy';
import './styles.scss';

const ACTIONS = {
  SUBMIT: 'submit',
  EDIT: 'edit',
  CANCEL: 'cancel',
};

export const QuestQaAnswerForm = props => {
  const {
    moduleData,
    onClick,
    onChange,
    qaFreeForm,
    qaFillBlanks,
    qaMultipleChoice,
    readOnly,
    richTextEditor,
  } = props;
  const {
    moduleBaseImageURL,
    moduleBaseThumbnailURL,
    activityPrompt,
    textInputReadOnly,
    textInputPlaceholder,
    submitButtonCaption,
    showSubmitButton,
    submitButtonTooltipText,
    showEditButton,
    editButtonTooltipText,
    editButtonCaption,
    showCancelButton,
    cancelButtonCaption,
    cancelButtonTooltipText,
    answerText = '',
    textInputMaxChars,
    answers,
    questions,
    moduleReadOnly,
  } = moduleData;

  const [richTextHtml, setRichTextHtml] = React.useState(answerText);

  React.useEffect(() => {
    if (answerText) {
      setRichTextHtml(answerText);
    }
  }, [answerText]);

  return (
    <div className="quest-qa-answer-form">
      {moduleBaseImageURL && (
        <div className="quest-qa-answer-image">
          <ImageClickHandler imageUrl={moduleBaseImageURL}>
            <img src={moduleBaseThumbnailURL} alt="module base thumbnail" />
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

      {richTextEditor && (
        <RichTextEditor
          className="mb-4"
          onChange={setRichTextHtml}
          editorValue={richTextHtml}
          placeholder=""
          readOnly={textInputReadOnly}
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
          <Tooltip
            title={answer.answerLetterTooltipText}
            position="top"
            theme="light"
            distance={-30}
          >
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
                  <img src={answer.answerIconURL} alt="Answer" />
                </div>
                <div className="qa-multiple-choice-answer-text">
                  {answer.answerText}
                </div>
              </div>
              <div className="qa-multiple-choice-scoring-text">
                {answer.scoringText}
              </div>
            </div>
          </Tooltip>
        ))}

      <div className="quest-qa-answer-actions">
        {showSubmitButton && (
          <Tooltip
            title={submitButtonTooltipText}
            distance={20}
            position="top"
            theme="light"
          >
            <Button
              className="quest-qa-answer-submit-btn"
              onClick={() => onClick(ACTIONS.SUBMIT, richTextHtml)}
              disabled={readOnly}
            >
              {submitButtonCaption}
            </Button>
          </Tooltip>
        )}
        {showEditButton && (
          <Tooltip
            theme="light"
            title={editButtonTooltipText}
            position="top"
            distance={20}
          >
            <Button
              className="quest-qa-answer-edit-btn"
              onClick={() => onClick(ACTIONS.EDIT, richTextHtml)}
              disabled={readOnly}
            >
              {editButtonCaption}
            </Button>
          </Tooltip>
        )}
        {showCancelButton && (
          <Tooltip theme="light" title={cancelButtonTooltipText} position="top">
            <Button
              className="quest-qa-answer-cancel-btn"
              onClick={() => onClick(ACTIONS.CANCEL, richTextHtml)}
              disabled={readOnly}
            >
              {cancelButtonCaption}
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};
