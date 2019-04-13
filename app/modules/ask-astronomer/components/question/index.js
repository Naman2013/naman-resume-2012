import BackButton from 'app/atoms/BackButton';
import QuestionListItem from 'app/modules/ask-astronomer/components/question-list-item';
import React from 'react';
import { Container } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export const Question = props => {
  const {
    questions,
    params,
    actions,
    allAnswers,
    canAnswerQuestions,
    canReplyToAnswers,
    allDisplayedAnswersObjs,
    fetchingAnswers,
    isDesktop,
    likeParams,
    user,
    objectId,
    submitAnswer,
    modalActions,
    toggleAllAnswersAndDisplay,
    updateQuestionsList,
  } = props;

  if (!questions || !questions.length) {
    // go back to questions list
    browserHistory.push(`/object-details/${params.objectId}/ask`);
    return null;
  }

  const item = questions.find(el => +el.threadId === +params.threadId);

  console.log(item);

  return (
    <>
      <BackButton />

      <Container>
        <QuestionListItem
          actions={actions}
          answers={allAnswers[params.threadId]}
          canAnswerQuestions={canAnswerQuestions}
          canReplyToAnswers={canReplyToAnswers}
          displayedAnswers={allDisplayedAnswersObjs}
          fetching={fetchingAnswers[params.threadId]}
          isDesktop={isDesktop}
          item={item}
          params={params}
          likeParams={likeParams}
          user={user}
          objectId={objectId}
          submitAnswer={submitAnswer}
          modalActions={modalActions}
          toggleAllAnswersAndDisplay={toggleAllAnswersAndDisplay}
          updateQuestionsList={updateQuestionsList}
        />
      </Container>
    </>
  );
};
