/***********************************
* V4 Community Group Overview Header
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import LargeButtonWithRightIcon from 'components/common/style/buttons/LargeButtonWithRightIcon';
import Button from 'components/common/style/buttons/Button';
import { astronaut, romance, white_tile_paper, nightfall } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { info } from 'styles/variables/iconURLs';
import {
  screenMedium,
  screenLarge,
} from 'styles/variables/breakpoints';
import { dropShadowContainer } from 'styles/mixins/utilities';
import DiscussionBoardDescription from 'components/common/DiscussionsBoard/DiscussionBoardDescription';

const {
  string,
} = PropTypes;

const GroupsHeader = ({
  condensed=false,
  description,
  isMobile,
  joinOrLeaveGroup,
  joinPrompt,
  showInformation,
  showJoinPrompt,
  subtitleList={},
  title,
  canEditGroup,
  discussionGroupId,
}) => (
  <div className="root">
    <div className="image-and-main-container">
      {!condensed ? <div className="groups-header-image">
        <img
          className="header-img"
          src="https://s3.amazonaws.com/webassets-slooh-com/assets/v4/icons/Group_Graphic_Placeholder.png"
        />
      </div> : null}
      <div className="main-container">
        <div className="groups-header-title desktop-hide" dangerouslySetInnerHTML={{ __html: title }} />
        <LabeledTitleTiles tiles={subtitleList} theme={{ boxShadow: 'none' }} />
        {condensed ? (<DiscussionBoardDescription groupId={discussionGroupId} description={description} canEdit={canEditGroup} />) : null}

        <div className="action-container">
          {showJoinPrompt ?
            <LargeButtonWithRightIcon
              icon="https://vega.slooh.com/assets/v4/common/comment.svg"
              text={joinPrompt}
              onClickEvent={joinOrLeaveGroup}
            /> : null}
            {isMobile && !condensed ? <Button icon={info} onClickEvent={showInformation} /> : null}
        </div>
      </div>
    </div>

    {!condensed ? (<div className="info-container">
      <div className="info-inner-container">
        <div className="groups-header-subtitle">Community Group</div>
        <div className="groups-header-title" dangerouslySetInnerHTML={{ __html: title }} />
        <DiscussionBoardDescription groupId={discussionGroupId} description={description} canEdit={canEditGroup} />
      </div>
    </div>) : null}

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
        background-color: ${nightfall};
        text-align: center;
      }

      .groups-header-title {
        font-size: 22px;
        padding: 15px 0;
        font-family: ${secondaryFont};
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
          height: 450px;
          justify-content: center;
          padding: 0;
          ${dropShadowContainer}
        }

        .header-img {
          transform: translateY(-90%);
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

export default GroupsHeader;
