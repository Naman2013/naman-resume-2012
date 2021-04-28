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

import styles from './qa-fill-blanks.style';

const { arrayOf, bool, number, shape, string } = PropTypes;

class QAFillBlanks extends Component {
  static propTypes = {
    panel: shape({
      panelId: number.isRequired,
      content: string.isRequired, // HTML
      isActivity: bool,
      activityTitle: string,
      activityInstructions: string,
    }),
  };

  static defaultProps = {};

  state = {};

  render() {
    const {
      activityTitle,
      activityInstructions,
      questionList,
      correctText,
      incorrectText,
    } = this.props;
   
    return (
      <div className="root">
        <IntroText title={activityTitle} desc={activityInstructions} />
        <QuestionList
          correctText={correctText}
          incorrectText={incorrectText}
          questionList={questionList}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default QAFillBlanks;
