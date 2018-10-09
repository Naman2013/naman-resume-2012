import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './story-excerpt-tile.style';

const StoryExcerptTile = ({
  author,
  linkLabel,
  linkUrl,
  postId,
  promptIconUrl,
  readingListPrompt,
  readingListType,
  shortDescription,
  title,
  toggleReadingListFlag,
  updateReadingInfoInList,
}) => (
  <div className="story-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: author }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: shortDescription }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} theme={{ height: '40px' }}/>
      {toggleReadingListFlag ? <ToggleReadingList
        itemId={postId}
        promptIconUrl={promptIconUrl}
        readingListPrompt={null}
        readingListType={readingListType}
        updateReadingInfoInList={updateReadingInfoInList}
      /> : null}
    </div>
    <style jsx>{style}</style>
  </div>
);

StoryExcerptTile.propTypes = {
  author: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  updateReadingInfoInList: PropTypes.func.isRequired,
};

export default StoryExcerptTile;
