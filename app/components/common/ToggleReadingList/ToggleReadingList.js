import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import pick from  'lodash/pick';
import ReadingListButton from 'components/common/style/buttons/ReadingListButton';
import { toggleReadingListState, STORY } from 'services/reading-lists';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

const RESPONSE_FIELDS = [
  'promptIconUrl',
  'readingListPrompt',
  'toggleFollowConfirmationFlag',
  'toggleFollowConfirmationPrompt',
  'toggleReadingListFlag',
  'toggleResponseText',
];

class ToggleReadingList extends Component {
  static propTypes = {
    itemId: oneOfType([string, number]).isRequired,
    readingListType: string.isRequired,
    promptIconUrl: string,
    readingListPrompt: string,
    updateReadingInfoInList: func,
  };
  static defaultProps = {
    promptIconUrl: '',
    readingListPrompt: '',
    updateReadingInfoInList: noop,
  };

  state = {
    icon: this.props.promptIconUrl,
    text: this.props.readingListPrompt,
  }

  toggleList = () => {
    const {
      itemId,
      readingListType,
      readingListPrompt,
      updateReadingInfoInList,
    } = this.props;
    toggleReadingListState({
      listItemId: itemId,
      readingListType,
    }).then((res) => {

      if (!res.data.apiError) {
        updateReadingInfoInList(
          res.data.listItemId,
          pick(res.data, RESPONSE_FIELDS)
        );
        this.setState(() => ({
          icon: res.data.promptIconUrl,
          text: readingListPrompt ? res.data.readingListPrompt : null,
        }));
      }
    });
  }
  render () {
    const {
      icon,
      text,
    } = this.state;
    return (
      <Fragment>
        <ReadingListButton
          icon={icon}
          text={text}
          onClickEvent={this.toggleList}
        />
      </Fragment>
    );
  }
}

export default ToggleReadingList;
