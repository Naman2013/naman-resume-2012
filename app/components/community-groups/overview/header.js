/***********************************
* V4 Community Group Overview Header
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import LabeledTitleTiles from 'components/common/style/LabeledTitleTiles';
import LargeButtonWithRightIcon from 'components/common/style/buttons/LargeButtonWithRightIcon';
import Button from 'components/common/style/buttons/Button';
import { astronaut, romance } from 'styles/variables/colors_tiles_v4';
import { secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenMediumPx } from 'styles/variables/breakpoints';

const {
  string,
} = PropTypes;

const GroupsHeader = ({
  isDesktop,
  isTablet,
  title,
  subtitleList=[],
  showJoinPrompt,
  joinPrompt,
  joinOrLeaveGroup,
  showInformation,
}) => (
  <div className="root">
    <div className="groups-header-image"></div>
    <div className="main-container">
      <div className="groups-header-title" dangerouslySetInnerHTML={{ __html: title }} />
      <LabeledTitleTiles list={[{ text: 'Private', label: 'Type:' }, { text: '33', label: 'Number:' }]} />
      <div className="action-container">
        {showJoinPrompt &&
          <LargeButtonWithRightIcon
            icon="https://vega.slooh.com/assets/v4/common/comment.svg"
            text={joinPrompt}
            onClickEvent={joinOrLeaveGroup}
          />}
          <Button icon="https://vega.slooh.com/assets/v4/common/comment.svg" onClickEvent={showInformation} />
      </div>
    </div>
    <style jsx>{`
      .root {
        display: block;
        color: ${astronaut};
        background-color: ${romance};
        padding: 15px 0;
        width: 100%;
      }

      .main-container {
        padding: 0 30px;
      }

      .groups-header-image {
        margin: 0 auto;
        height: 200px;
        width: 300px;
        background-color: ${astronaut};
      }

      .groups-header-title {
        font-size: 22px;
        padding: 15px 0;
        font-family: ${secondaryFont};
      }

      .action-container {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
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
          align-items: center;
          display: flex;
          flex-direction: row;
          height: 400px;
          justify-content: center;
          margin: 0 auto;
          width: ${screenMediumPx};
        }

        .groups-header-image {
          margin: 0 15px;
          height: 278px;
          width: 278px;
        }

        .main-container {
          width: 342px;
        }
      }

    `}</style>
  </div>
);

export default GroupsHeader;
