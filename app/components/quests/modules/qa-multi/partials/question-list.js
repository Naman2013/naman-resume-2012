import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IntroText from 'components/common/form-sections/intro-text';
import SectionHeader from 'components/common/form-sections/section-header';
import PromptBox from 'components/quests/modules/partials/prompt-box';
import MultipleChoiceItem from 'components/common/form-fields/multiple-choice-item';
import CircleCharacter from 'components/common/medallions/circle-character';
import { astronaut, geyser, shadows } from 'styles/variables/colors_tiles_v4';


const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

const QuestionList = ({
  questionList,
  activityPrompt,
}) => (
  <Fragment>
    {questionList.map(question => (
      <div>
        <SectionHeader title={question.questionTitle} />
        <IntroText desc={question.questionInstructions} />
        <PromptBox>
          <span className="title-text" dangerouslySetInnerHTML={{ __html: activityPrompt }} />

          {question.options.map(choice => (
            <MultipleChoiceItem
              isActive={choice.isCorrect}
              renderIcon={() => <CircleCharacter size={35} character={choice.optionIdLabel} />}
              title={choice.label}
              onClickItem={null}
              value={choice.value}
              status={choice.isCorrect}
            />
          ))}
        </PromptBox>
      </div>
    ))}
    <style jsx>
      {`
        .title-text {
          text-transform: uppercase;
          font-weight: bold;
          font-size: 11px;
          padding: 10px;
          color: ${astronaut};
        }
      `}
    </style>
  </Fragment>
);


QuestionList.propTypes = {
  questionList: arrayOf(shape({
    questionTitle: string,
    questionInstructions: string,
  })),
  activityPrompt: string.isRequired,
};

QuestionList.defaultProps = {
  questionList: [],
};

export default QuestionList;
