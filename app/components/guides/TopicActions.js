import React from 'react';
import PropTypes from 'prop-types';
import { toggleReadingListState, GUIDE } from 'app/services/reading-lists';
import ToggleReadingList from 'app/components/common/ToggleReadingList';
import FollowObjectButton from '../object-details/FollowObjectButton';
import style from './TopicAction.style';

const TopicActions = ({
  followButtonIconURL,
  readingListType,
  followButtonText,
  guideId,
  objectId,
  user,
}) => {
  
  return (
    <ul className="button-container">
      <li>
        {guideId && (
          <ToggleReadingList
            itemId={guideId}
            readingListType={readingListType}
            readingListPrompt={followButtonText}
            promptIconUrl={followButtonIconURL}
          />
        )}
        {objectId && (
          <FollowObjectButton
            objectId={objectId}
            user={user}
            followButtonText={followButtonText}
            followButtonIconURL={followButtonIconURL}
          />
        )}
      </li>

      <style jsx>{style}</style>
    </ul>
  );
};

TopicActions.propTypes = {
  followButtonIconURL: PropTypes.string.isRequired,
  followButtonText: PropTypes.string.isRequired,
  guideId: PropTypes.string,
  objectId: PropTypes.string,
};

TopicActions.defaultProps = {
  guideId: null,
  objectId: null,
};

export default TopicActions;
