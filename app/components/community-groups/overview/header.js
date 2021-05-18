/***********************************
 * V4 Community Group Overview Header
 *
 *
 *
 ***********************************/
import React, { Component } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import LabeledTitleTiles from 'app/components/common/style/LabeledTitleTiles';
import LargeButtonWithRightIcon from 'app/components/common/style/buttons/LargeButtonWithRightIcon';
import Button from 'app/components/common/style/buttons/Button';
import {
  astronaut,
  romance,
  white_tile_paper,
  nightfall,
} from 'app/styles/variables/colors_tiles_v4';
import { secondaryFont } from 'app/styles/variables/fonts';
import { info } from 'app/styles/variables/iconURLs';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { dropShadowContainer } from 'app/styles/mixins/utilities';
import DiscussionBoardDescription from 'app/components/common/DiscussionsBoard/DiscussionBoardDescription';
import AskToJoinGroup from 'app/components/common/AskToJoinGroup';

const { string } = PropTypes;

const GroupsHeader = ({
  condensed = false,
  description,
  isMobile,
  joinOrLeaveGroup,
  joinPrompt,
  showInformation,
  showJoinPrompt,
  subtitleList = {},
  title,
  canEditGroup,
  discussionGroupId,
  isEditMode,
  editButtonText,
  canSeeGroupContent,
  showAskToJoin,
  joinActionIconUrl,
  askPrompt,
  updatePrompt,
  pendingPrompt,
  pendingPromptFlag,
  headerGraphic,
  headerGraphicContainerBackgroundColor,
  headerGraphicBackgroundColor,
}) => {
  const { t } = useTranslation();

  const headerGraphicContainerStyle = {
	backgroundColor: headerGraphicContainerBackgroundColor,
  }

  const headerGraphicStyle = {
	backgroundColor: headerGraphicBackgroundColor,
  }

  return (
    <div className="root">
      <div className="image-and-main-container">
        {!condensed ? (
          <div style={headerGraphicContainerStyle} className="groups-header-image">
	    <img style={headerGraphicStyle} className="header-img" src={headerGraphic}/>
          </div>
        ) : null}
        <div className="main-container">
          <div
            className="groups-header-title desktop-hide textCenter"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <LabeledTitleTiles
            tiles={subtitleList}
            theme={{ boxShadow: 'none' }}
          />
          {canEditGroup && (
            <Button
              theme={{
                color: astronaut,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '10px',
              }}
              onClickEvent={() => {
                browserHistory.push(
                  `/community-groups/${discussionGroupId}/${
                    isEditMode ? '' : 'edit=true'
                  }`
                );
              }}
            >
              {editButtonText}
            </Button>
          )}
          {condensed && canSeeGroupContent ? (
            <DiscussionBoardDescription
              groupId={discussionGroupId}
              description={description}
              canEdit={canEditGroup && isEditMode}
              canEditGroup={canEditGroup}
            />
          ) : null}

          <div className="action-container">
            {showJoinPrompt ? (
              <LargeButtonWithRightIcon
                icon="https://vega.slooh.com/assets/v4/common/comment.svg"
                text={joinPrompt}
                onClickEvent={joinOrLeaveGroup}
              />
            ) : null}
            {isMobile && canSeeGroupContent && !condensed ? (
              <Button icon={info} onClickEvent={showInformation} />
            ) : null}
            {showAskToJoin ? (
              <AskToJoinGroup
                updatePrompt={updatePrompt}
                discussionGroupId={discussionGroupId}
                askPrompt={askPrompt}
                joinActionIconUrl={joinActionIconUrl}
                disabled={pendingPromptFlag}
              />
            ) : null}
          </div>

          {pendingPromptFlag && (
            <div className="ask-pending-prompt">{pendingPrompt}</div>
          )}
        </div>
      </div>

      {!condensed ? (
        <div className="info-container">
          <div className="info-inner-container">
            <div className="groups-header-subtitle">
              {t('Clubs.CommunityGroup')}
            </div>
            <div
              className="groups-header-title"
              dangerouslySetInnerHTML={{ __html: title }}
            />
            <DiscussionBoardDescription
              groupId={discussionGroupId}
              description={description}
              canEdit={canEditGroup && isEditMode}
              canEditGroup={canEditGroup}
            />
          </div>
        </div>
      ) : null}

      <style jsx>{`
        .root {
          display: block;
          color: ${astronaut};
          background-color: ${romance};
          padding: 15px 0;
          width: 100%;
        }
        .image-and-main-container {
        }

        .info-container {
          display: none;
        }

        .main-container {
          padding: 0 30px;
        }

        .header-img {
          height: 65%;
          margin-top: 50%;
          transform: translateY(-90%);
        }

        .groups-header-image {
          margin: 0 auto;
          height: 200px;
          width: 300px;
          text-align: center;
        }

        .groups-header-title {
          font-size: 22px;
          padding: 15px 0;
          font-family: ${secondaryFont};
        }

        .textCenter{
          text-align: center;
        }

        .groups-header-information {
          font-family: ${secondaryFont};
          font-size: 19px;
        }

        .action-container {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }

        .left {
          flex: 3;
          color: ${romance};
        }

        .right {
          text-align: right;
          flex: 1;
        }

        .ask-pending-prompt {
          font-family: ${secondaryFont};
          font-size: 19px;
          text-align: center;
        }

        @media ${screenMedium} {
          .root {
            margin: 0 auto;
            height: 400px;
            ${dropShadowContainer}
          }

          .image-and-main-container {
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 100%;
          }

          .groups-header-image {
            margin: 0 15px;
            height: 278px;
            width: 278px;
          }

          .main-container {
            width: 342px;
          }

          .header-img {
            transform: translateY(-50%);
          }
        }

        @media ${screenLarge} {
          .root {
            align-items: center;
            display: flex;
            flex-direction: row;
            justify-content: center;
            padding: 0;
            ${dropShadowContainer}
          }

          .header-img {
            transform: translateY(-90%);
	    margin-top: 175px;
	    min-height: 190px;
	    min-width: auto;
          }

          .image-and-main-container {
            align-items: center;
            background-image: url(${white_tile_paper});
            display: flex;
            flex-direction: column;
            height: 100%;
            justify-content: flex-start;
            margin: 0 auto;
            width: 300px;
          }

          .info-container {
            display: flex;
            flex: 1 1 0;
            display: block;
            align-items: center;
          }

          .info-inner-container {
            width: 300px;
            margin: 0 auto;
          }

          .desktop-hide {
            display: none;
          }

          .groups-header-image {
            margin: 0 15px;
            height: 200px;
            width: 100%;
          }

          .main-container {
            width: 100%;
          }

          .groups-header-subtitle {
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
          }

          .groups-header-title {
            font-size: 40px;
          }

          .groups-header-information {
            font-family: ${secondaryFont};
            font-size: 19px;
          }
        }
      `}</style>
    </div>
  );
};

export default GroupsHeader;
