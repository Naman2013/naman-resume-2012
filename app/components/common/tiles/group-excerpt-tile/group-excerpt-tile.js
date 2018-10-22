import React from 'react';
import PropTypes from 'prop-types';
import { Link, browserHistory } from 'react-router';
import { guideCorner } from 'styles/variables/iconURLs';
import ToggleJoinGroup from 'components/common/ToggleJoinGroup';
import AskToJoinGroup from 'components/common/AskToJoinGroup';
import Button from 'components/common/style/buttons/Button';
import style from './group-excerpt-tile.style';

const GroupExcerptTile = ({
  memberCountDisplay,
  discussionGroupId,
  title,
  viewMessage,
  linkUrl,
  joinPromptIconUrl,
  canView,
  joinPrompt,
  accessDescription,
  showJoinPrompt,
  showAskPrompt,
  joinActionIconUrl,
  askPrompt,
  updatePrompt,
  updateGroupItemInfo,
}) => (
  <div className="group-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="sub-title" dangerouslySetInnerHTML={{ __html: memberCountDisplay }} />
    <div className="description" dangerouslySetInnerHTML={{ __html: accessDescription }} />
    <div className="actions">
      {canView ? <Button
        theme={{ height: '40px', marginRight: '10px' }}
        text={viewMessage}
        onClickEvent={() => browserHistory.push(linkUrl)}
      /> : null}
      {showJoinPrompt ? <ToggleJoinGroup
        updateGroupItemInfo={updateGroupItemInfo}
        discussionGroupId={discussionGroupId}
        joinPrompt={joinPrompt}
        joinPromptIconUrl={joinPromptIconUrl}
      /> : null}
      {showAskPrompt ? <AskToJoinGroup
        updatePrompt={updatePrompt}
        discussionGroupId={discussionGroupId}
        askPrompt={askPrompt}
        joinActionIconUrl={joinActionIconUrl}
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
  joinPromptIconUrl: PropTypes.string.isRequired,
  joinPrompt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showJoinPrompt: PropTypes.bool.isRequired,
  updateGroupItemInfo: PropTypes.func.isRequired,
  viewMessage: PropTypes.string.isRequired,
  showAskPrompt: PropTypes.bool.isRequired,
  joinActionIconUrl: PropTypes.string.isRequired,
  askPrompt: PropTypes.string.isRequired,
  updatePrompt: PropTypes.func.isRequired,
};

export default GroupExcerptTile;
