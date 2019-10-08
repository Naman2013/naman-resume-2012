import React, { Component } from 'react';
import PropTypes, { array, string, bool } from 'prop-types';
import findIndex from 'lodash/findIndex';
import {withTranslation} from 'react-i18next';
import DropDown from 'app/components/common/DropDown';
import styles from './question-filter.style';


const { func, shape } = PropTypes;

@withTranslation
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
    const { dropdownOptions, t } = this.props;
    return (
      dropdownOptions || [
        {
          label: t('AskAnAstronomer.AllQuestions'),
          value: 'objectonly',
        },
        {
          label: t('AskAnAstronomer.AllAnswered'),
          value: 'allanswered',
        },
        {
          label: t('AskAnAstronomer.AllUnanswered'),
          value: 'allunanswered',
        },
      ]
    );
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
        {showDropdown ? (
          <DropDown
            options={this.dropdownOptions}
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
