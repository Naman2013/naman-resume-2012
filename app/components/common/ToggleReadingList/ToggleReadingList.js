import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import pick from 'lodash/pick';
import ReadingListButton from 'app/components/common/style/buttons/ReadingListButton';
import { toggleReadingListState, STORY } from 'app/services/reading-lists';

const { bool, func, number, oneOfType, string } = PropTypes;

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
  };

  toggleList = () => {
    const {
      itemId,
      readingListType,
      readingListPrompt,
      updateReadingInfoInList,
      onUpdate,
    } = this.props;
    toggleReadingListState({
      listItemId: itemId,
      readingListType,
    }).then(res => {
      if (!res.data.apiError) {
        updateReadingInfoInList(
          res.data.listItemId,
          pick(res.data, RESPONSE_FIELDS)
        );
        this.setState(() => ({
          icon: res.data.promptIconUrl,
          text: readingListPrompt ? res.data.readingListPrompt : null,
        }));

        if (onUpdate) {
          onUpdate();
        }
      }
    });
  };

  render() {
    const { icon, text } = this.state;
    const { theme } = this.props;
    return (
      <Fragment>
        <ReadingListButton
          theme={theme}
          icon={icon}
          text={text}
          onClickEvent={this.toggleList}
        />
      </Fragment>
    );
  }
}

export default ToggleReadingList;
