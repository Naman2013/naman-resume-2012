import React from 'react';
import PropTypes from 'prop-types';
import { toggleReadingListState, GUIDE } from 'services/reading-lists';
import ToggleReadingList from 'components/common/ToggleReadingList';
import style from './TopicAction.style';

const TopicActions = ({ followButtonIconURL, readingListType, followButtonText, guideId, toggleReadingListFlag }) => (
  <ul className="button-container">
    <li>
      {toggleReadingListFlag ? <ToggleReadingList
        itemId={guideId}
        readingListType={readingListType}
        readingListPrompt={followButtonText}
        promptIconUrl={followButtonIconURL}
      /> : null}
    </li>

    <style jsx>{style}</style>
  </ul>
);

TopicActions.propTypes = {
  followButtonIconURL: PropTypes.string.isRequired,
  followButtonText: PropTypes.string.isRequired,
  guideId: PropTypes.string.isRequired,
};

export default TopicActions;
