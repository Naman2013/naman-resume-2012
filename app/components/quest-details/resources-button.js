import React from 'react';
import PropTypes from 'prop-types';
import { toggleReadingListState, GUIDE } from 'services/reading-lists';
import GenericButton from 'components/common/style/buttons/Button';
import style from './resources-button.style';

const ResourcesButton = ({ followButtonIconURL, followButtonText, guideId }) => (
  <ul className="button-container">
    <li>
      <GenericButton
        onClickEvent={() => {
          toggleReadingListState({
            listItemId: guideId,
            readingListType: GUIDE,
          });
        }}
        text={followButtonText}
        icon={followButtonIconURL}
      />
    </li>

    <style jsx>{style}</style>
  </ul>
);

ResourcesButton.propTypes = {
  followButtonIconURL: PropTypes.string.isRequired,
  followButtonText: PropTypes.string.isRequired,
  guideId: PropTypes.string.isRequired,
};

export default ResourcesButton;
