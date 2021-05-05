import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Btn from 'app/atoms/Btn';
import Icon from 'app/atoms/Icon';
import ToggleJoinGroup from 'app/components/common/ToggleJoinGroup';
import AskToJoinGroup from 'app/components/common/AskToJoinGroup';
import Button from 'app/components/common/style/buttons/Button';
import style from './group-excerpt-tile.style';

const GroupExcerptTile = ({
  memberCountDisplay,
  discussionGroupId,
  title,
  viewMessage,
  linkUrl,
  filterType,
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
  canEditGroup,
  updateList,
}) => (
  <div className="group-tile-root">
    <div className="title" dangerouslySetInnerHTML={{ __html: title }} />
    <div
      className="sub-title"
      dangerouslySetInnerHTML={{ __html: memberCountDisplay }}
    />
    <div
      className="description"
      dangerouslySetInnerHTML={{ __html: accessDescription }}
    />
    <div className="actions">
      {canView && (
        <Button
          theme={{ height: '40px', marginRight: '10px' }}
          text={viewMessage}
          onClickEvent={() => browserHistory.push(linkUrl)}
        />
      )}
      {canEditGroup && (
        <Btn
          mod="circle"
          onClick={() => browserHistory.push(`${linkUrl}/edit=:edit`)}
        >
          <Icon i="pencil" />
        </Btn>
      )}
      {showJoinPrompt ? (
        <ToggleJoinGroup
          filterType={filterType}
          updateList={updateList}
          updateGroupItemInfo={updateGroupItemInfo}
          discussionGroupId={discussionGroupId}
          joinPrompt={joinPrompt}
          joinPromptIconUrl={joinPromptIconUrl}
        />
      ) : null}
      {showAskPrompt ? (
        <AskToJoinGroup
          updatePrompt={updatePrompt}
          discussionGroupId={discussionGroupId}
          askPrompt={askPrompt}
          joinActionIconUrl={joinActionIconUrl}
        />
      ) : null}
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
