import React from 'react';
import PropTypes from 'prop-types';
import { toggleReadingListState, GUIDE } from 'services/reading-lists';
import GenericButton from 'components/common/style/buttons/Button';
import style from './TopicAction.style';

const TopicActions = ({ followButtonIconURL, followButtonText, guideID }) => (
  <ul className="button-container">
    <li>
      <GenericButton
        onClickEvent={() => {
          toggleReadingListState({
            listItemId: guideID,
            readingListType: GUIDE,
          });
        }}
        text={followButtonText}
        icon={followButtonIconURL}
      />
    </li>

    <li>
      <GenericButton
        onClickEvent={() => {}}
        icon="https://vega.slooh.com/assets/v4/common/comment.svg"
      />
    </li>

    <style jsx>{style}</style>
  </ul>
);

TopicActions.propTypes = {
  followButtonIconURL: PropTypes.string.isRequired,
  followButtonText: PropTypes.string.isRequired,
  guideID: PropTypes.string.isRequired,
};

export default TopicActions;
