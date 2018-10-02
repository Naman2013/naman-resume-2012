import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReadingListButton from 'components/common/style/buttons/ReadingListButton';
import { toggleReadingListState, STORY } from 'services/reading-lists';

const {
  bool,
  func,
  number,
  oneOfType,
  string,
} = PropTypes;

class ToggleReadingList extends Component {
  static propTypes = {
    itemId: oneOfType([string, number]).isRequired,
    readingListType: string.isRequired,
    promptIconUrl: string,
    readingListPrompt: string,
  };
  static defaultProps = {};

  state = {
    icon: this.props.promptIconUrl,
    text: this.props.readingListPrompt,
  }

  toggleList = () => {
    const {
      itemId,
      readingListType,
    } = this.props;
    toggleReadingListState({
      listItemId: itemId,
      readingListType,
    }).then((res) => {

      if (!res.data.apiError) {
        this.setState(() => ({
          icon: res.data.promptIconUrl,
          text: res.data.readingListPrompt,
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
