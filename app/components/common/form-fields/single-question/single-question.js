/** *********************************
 * V4 Single Question
 *
 *
 *
 ***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import uniqueId from 'lodash/uniqueId';
import styles from './single-question.style';

const { bool, func, string } = PropTypes;

export const SingleQuestion = props => {
  const { question, placeholder, value } = props;

  return (
    <div key={uniqueId()}>
      <div
        className="question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <input
        type="text"
        className="answer"
        value={value}
        placeholder={placeholder}
      />
      <style jsx>{styles}</style>
    </div>
  );
};

SingleQuestion.propTypes = {
  iconUrl: string,
  renderIcon: func,
  title: string.isRequired,
  status: string,
  isActive: bool,
  onClickItem: func.isRequired,
};
SingleQuestion.defaultProps = {
  iconUrl: null,
  isActive: false,
  renderIcon: null,
  status: null,
};

export default SingleQuestion;
