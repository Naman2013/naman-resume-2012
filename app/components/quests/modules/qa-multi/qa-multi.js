/***********************************
 * V4
 *
 *
 *
 ***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import IntroText from 'app/components/common/form-sections/intro-text';
import SectionHeader from 'app/components/common/form-sections/section-header';
import QuestionList from './partials/question-list';

import styles from './qa-multi.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

class QAMulti extends Component {
  static propTypes = {
    isActivity: bool,
    activityTitle: string,
    activityInstructions: string,
    activityPrompt: string,
  };

  static defaultProps = {};

  state = {};

  render() {
    const {
      activityTitle,
      activityInstructions,
      activityPrompt,
      questionList,
      correctText,
      incorrectText,
    } = this.props;
   
    return (
      <div className="root">
        <IntroText title={activityTitle} desc={activityInstructions} />
        <QuestionList
          questionList={questionList}
          activityPrompt={activityPrompt}
          correctText={correctText}
          incorrectText={incorrectText}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default QAMulti;
