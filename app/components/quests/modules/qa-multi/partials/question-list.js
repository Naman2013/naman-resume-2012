import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import IntroText from 'app/components/common/form-sections/intro-text';
import SectionHeader from 'app/components/common/form-sections/section-header';
import PromptBox from 'app/components/quests/modules/partials/prompt-box';
import MultipleChoiceItem from 'app/components/common/form-fields/multiple-choice-item';
import CircleCharacter from 'app/components/common/medallions/circle-character';
import { astronaut, geyser, shadows } from 'app/styles/variables/colors_tiles_v4';


const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;
/**

This will need to change to a React class
We will then need to store the users selections and grade them on form submit.
then display the status (correct or incorrect) in MultipleChoiceItem
*/

const QuestionList = ({
  questionList,
  activityPrompt,
  incorrectText,
  correctText,
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
              status={choice.isCorrect ? correctText : incorrectText}
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
