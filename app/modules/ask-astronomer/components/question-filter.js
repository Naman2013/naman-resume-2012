import React, { Component } from 'react';
import PropTypes, { array, string, bool } from 'prop-types';
import findIndex from 'lodash/findIndex';
import { FormattedMessage } from 'react-intl';
import DropDown from 'app/components/common/DropDown';
import styles from './question-filter.style';
import messages from './question-filter.messages';

const { func, shape } = PropTypes;

class QuestionFilter extends Component {
  static propTypes = {
    dropdownOptions: array,
    countText: string,
    showDropdown: bool,
  };

  static defaultProps = {
    dropdownOptions: null,
    countText: null,
    showDropdown: true,
  };

  state = {
    selectedIndex: findIndex(
      this.dropdownOptions,
      filter => filter.value === this.props.selectedFilter
    ),
  };

  get dropdownOptions() {
    return [
      {
        label: <FormattedMessage {...messages.AllQuestions} />,
        value: 'objectonly',
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

    return totalCount !== 1
      ? `${totalCount} Questions`
      : `${totalCount} Question`;
  }

  handleSelect = (e, selectedItem) => {
    this.setState(() => ({
      selectedIndex: findIndex(
        this.dropdownOptions,
        filter => filter.value === selectedItem.value
      ),
    }));

    this.props.changeAnswerState({ answerState: selectedItem.value });
  };

  render() {
    const { totalCount, dropdownOptions, countText, showDropdown } = this.props;
    const { selectedIndex } = this.state;
    return (
      <div className="root">
        <span
          className="title"
          dangerouslySetInnerHTML={{ __html: countText || this.countText }}
        />
        {showDropdown && totalCount ? (
          <DropDown
            options={dropdownOptions || this.dropdownOptions}
            selectedIndex={selectedIndex}
            handleSelect={this.handleSelect}
          />
        ) : null}
        <style jsx>{styles}</style>
      </div>
    );
  }
}

export default QuestionFilter;
