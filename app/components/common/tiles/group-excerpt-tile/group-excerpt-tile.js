import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { guideCorner } from 'styles/variables/iconURLs';
import ToggleReadingList from 'components/common/ToggleReadingList';
import Button from 'components/common/style/buttons/Button';
import style from './group-excerpt-tile.style';

const GroupExcerptTile = ({
  memberCountDisplay,
  discussionGroupId,
  title,
  viewMessage,
  linkUrl,
  promptIconUrl,
  canView,
  readingListPrompt,
  readingListType,
  accessDescription,
  toggleReadingListFlag,
  updateReadingInfoInList,
}) => (
  <div className="group-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: memberCountDisplay }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: accessDescription }} />
    <div className="actions">
      {canView ? <Button text={viewMessage} onClickEvent={() => browserHistory.push(linkUrl)} /> : null}
      {toggleReadingListFlag ? <ToggleReadingList
        updateReadingInfoInList={updateReadingInfoInList}
        itemId={discussionGroupId}
        readingListType={readingListType}
        readingListPrompt={null}
        promptIconUrl={promptIconUrl}
      /> : null}
    </div>
    <style jsx>{style}</style>
  </div>
);

GroupExcerptTile.propTypes = {
  accessDescription: PropTypes.string.isRequired,
  canView: PropTypes.bool.isRequired,
  linkUrl: PropTypes.string.isRequired,
  memberCountDisplay: PropTypes.string.isRequired,
  promptIconUrl: PropTypes.string.isRequired,
  readingListPrompt: PropTypes.string.isRequired,
  readingListType: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  toggleReadingListFlag: PropTypes.bool.isRequired,
  updateReadingInfoInList: PropTypes.func.isRequired,
  viewMessage: PropTypes.string.isRequired,
};

export default GroupExcerptTile;
