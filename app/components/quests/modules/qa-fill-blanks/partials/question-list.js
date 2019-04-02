import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import IntroText from 'components/common/form-sections/intro-text';
import SectionHeader from 'components/common/form-sections/section-header';
import PromptBox from 'components/quests/modules/partials/prompt-box';
import SingleQuestion from 'components/common/form-fields/single-question';
import CircleCharacter from 'components/common/medallions/circle-character';
import { astronaut, geyser, shadows } from 'styles/variables/colors_tiles_v4';

const { arrayOf, bool, number, shape, string } = PropTypes;

/**

  We will then need to store the users selections and grade them on form submit.
*/

class QuestionList extends Component {
  static propTypes = {
    questionList: arrayOf(
      shape({
        questionTitle: string,
        questionInstructions: string,
      })
    ),
    activityPrompt: string.isRequired,
  };

  static defaultProps = {
    questionList: [],
  };

  state = {};

  render() {
    const {
      questionList,
      activityPrompt,
      correctText,
      incorrectText,
    } = this.props;

    return (
      <Fragment>
        {questionList.map(question => (
          <div>
            <SectionHeader title={question.questionTitle} />
            <IntroText desc={question.questionInstructions} />
            <PromptBox>
              <div className="inner-prompt">
                {question.options.map(choice => (
                  <div className="single-question">
                    <SingleQuestion
                      question={choice.question}
                      value=""
                      placeholder={choice.placeholder}
                    />
                  </div>
                ))}
              </div>
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

            .inner-prompt {
              padding: 25px;
            }

            .single-question {
              margin: 25px 0;
            }
          `}
        </style>
      </Fragment>
    );
  }
}

export default QuestionList;
