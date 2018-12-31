import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { FormattedMessage } from 'react-intl';
import DropDown from 'components/common/DropDown';
import styles from './question-filter.style';
import messages from './question-filter.messages';

const { func, shape } = PropTypes;

class QuestionFilter extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    selectedIndex: findIndex(
      this.dropdownOptions,
      filter => filter.value === this.props.selectedFilter,
    ),
  };

  get dropdownOptions() {
    return [
      {
        label: <FormattedMessage {...messages.AllQuestions} />,
        value: 'all',
      },
      {
        label: <FormattedMessage {...messages.AllAnswered} />,
        value: 'allanswered',
      },
      {
        label: <FormattedMessage {...messages.AllUnanswered} />,
        value: 'allunanswered',
      },
    ];
  }

  get countText() {
    const { totalCount } = this.props;

    return totalCount != 1 ? `${totalCount} Questions` : `${totalCount} Question`;
  }

  handleSelect = (e, selectedItem) => {
    this.setState(() => ({
      selectedIndex: findIndex(this.dropdownOptions, filter => filter.value === selectedItem.value),
    }));

    this.props.changeAnswerState({ answerState: selectedItem.value });
  };

  render() {
    const { totalCount } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className="root">
        <span className="title" dangerouslySetInnerHTML={{ __html: this.countText }} />
        <DropDown
          options={this.dropdownOptions}
          selectedIndex={selectedIndex}
          handleSelect={this.handleSelect}
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default QuestionFilter;
