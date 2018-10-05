import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './story-excerpt-tile.style';

const StoryTile = ({
  postId,
  title,
  author,
  linkLabel,
  linkUrl,
  excerpt,
  readingListPrompt,
  readingListType,
  toggleReadingListFlag,
  promptIconUrl,
}) => (
  <div className="story-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: author }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: excerpt }} />
    <div className="actions">
      <Button text={linkLabel} onClickEvent={() => browserHistory.push(linkUrl)} />
      {toggleReadingListFlag ? <ToggleReadingList
        itemId={postId}
        readingListType={readingListType}
        readingListPrompt={null}
        promptIconUrl={promptIconUrl}
      /> : null}
    </div>
    <style jsx>{style}</style>
  </div>
);

StoryTile.propTypes = {
  storyReferenceTitle: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  linkLabel: PropTypes.string.isRequired,
  linkUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
};

export default StoryTile;
