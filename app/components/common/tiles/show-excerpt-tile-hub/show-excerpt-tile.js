import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './show-excerpt-tile.style';

const ShowTile = ({
  airdateDisplay,
  eventId,
  showReferenceTitle,
  linkLabel,
  eventDetailsURL,
  promptIconUrl,
  readingListPrompt,
  readingListType,
  eventShortDescription,
  toggleReadingListFlag,
  updateReadingInfoInList,
}) => (
  <div className="show-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: showReferenceTitle }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: airdateDisplay }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: eventShortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(eventDetailsURL)} />
      {toggleReadingListFlag ? <ToggleReadingList
        updateReadingInfoInList={updateReadingInfoInList}
        itemId={eventId}
        readingListType={readingListType}
        readingListPrompt={null}
        promptIconUrl={promptIconUrl}
      /> : null}
    </div>
    <style jsx>{style}</style>
  </div>
);

ShowTile.propTypes = {
  airdateDisplay: PropTypes.string.isRequired,
  showReferenceTitle: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  eventDetailsURL: PropTypes.string.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  eventShortDescription: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  updateReadingInfoInList: PropTypes.func.isRequired,
};

export default ShowTile;
