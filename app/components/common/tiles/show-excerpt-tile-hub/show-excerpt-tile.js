import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './show-excerpt-tile.style';

const ShowTile = ({
  airdateDisplay,
  eventId,
  eventTitle,
  linkLabel,
  linkUrl,
  promptIconUrl,
  readingListPrompt,
  readingListType,
  shortDescription,
  toggleReadingListFlag,
  updateReadingInfoInList,
  withinReletedSection,
}) => (
  <div className="show-tile-root" style={withinReletedSection && { height: '200px', padding: '20px' }}>
    <div className="title" dangerouslySetInnerHTML={{ __html: eventTitle }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: airdateDisplay }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} theme={{ height: '40px' }}/>
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
  eventTitle: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  updateReadingInfoInList: PropTypes.func.isRequired,
};

export default ShowTile;
