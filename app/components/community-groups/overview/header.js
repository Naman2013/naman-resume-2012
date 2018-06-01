/***********************************
* V4 Community Group Overview Header
*
*
*
***********************************/
import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { black, darkBlueGray, white, turqoise } from '../../../styles/variables/colors';
import { secondaryFont } from '../../../styles/variables/fonts';

const {
  string,
} = PropTypes;

const GroupsHeader = ({
  title,
  subtitleList=[],
  showJoinPrompt,
  joinPrompt,
  joinOrLeaveGroup,
}) => (
  <div className="groups-header">
    <div className="left">
      <h3 dangerouslySetInnerHTML={{ __html: title }} />
      <h4 dangerouslySetInnerHTML={{ __html: subtitleList.join(' | ') }} />
    </div>
    <div className="right">
      {showJoinPrompt && <button dangerouslySetInnerHTML={{ __html: joinPrompt }} onClick={joinOrLeaveGroup} />}
    </div>
    <style jsx>{`
      .groups-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: ${darkBlueGray};
        padding: 25px;
      }

      .left {
        flex: 3;
        color: ${white};
      }

      .right {
        text-align: right;
        flex: 1;
      }

    `}</style>
  </div>
);

export default GroupsHeader;
