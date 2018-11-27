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
import IntroText from 'components/common/form-sections/intro-text';
import SectionHeader from 'components/common/form-sections/section-header';
import QuestionList from './partials/question-list';

import styles from './qa-multi.style';

const {
  arrayOf,
  bool,
  number,
  shape,
  string,
} = PropTypes;

class QAMulti extends Component {
  static propTypes = {
    panel: shape({
      panelId: number.isRequired,
      content: string.isRequired, // HTML
      isActivity: bool,
      activityTitle: string,
      activityInstructions: string,
      activityPrompt: string,
    }),
  }

  static defaultProps = {

  };

  state = {
  };



  render() {
    const {
      activityTitle,
      activityInstructions,
      activityPrompt,
      questionList,
    } = this.props;
    console.log("PROPS", this.props)
    return (<div className="root">
      <IntroText title={activityTitle} desc={activityInstructions} />
      <QuestionList questionList={questionList} activityPrompt={activityPrompt} />
      <style jsx>{styles}</style>
    </div>);
  }
}

export default QAMulti;
