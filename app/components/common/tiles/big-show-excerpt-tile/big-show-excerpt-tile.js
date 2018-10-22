import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './big-show-excerpt-tile.style';

const BigShowExcerptTile = ({
  displayDate,
  eventId,
  eventTitle,
  linkLabel,
  linkUrl,
  promptIconUrl,
  displayTime,
  eventLabel,
  eventHostName,
  readingListPrompt,
  readingListType,
  eventShortDescription,
  toggleReadingListFlag,
  updateReadingInfoInList,
}) => (
  <div className="show-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: eventTitle }} />
    <div className="info-container">
      <div className="sub-title" dangerouslySetInnerHTML={{ __html: eventLabel }} />
      <div className="sub-title" dangerouslySetInnerHTML={{ __html: displayDate }} />
      <div className="sub-title" dangerouslySetInnerHTML={{ __html: displayTime }} />
      <div className="sub-title" dangerouslySetInnerHTML={{ __html: eventHostName }} />
    </div>
    <div className="description" dangerouslySetInnerHTML={{ __html: eventShortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} theme={{ height: '40px' }} />
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

BigShowExcerptTile.propTypes = {
  displayDate: PropTypes.string.isRequired,
  eventTitle: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  eventShortDescription: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  updateReadingInfoInList: PropTypes.func.isRequired,
};

export default BigShowExcerptTile;
