/***********************************
* V4 Community Groups List Item Hover
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
} from '../../../modules/community-groups/actions';
import {
  darkBlueGray,
  white,
  pink,
} from '../../../styles/variables/colors';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const HoverView = ({
  askPrompt,
  askToJoin,
  canView,
  discussionGroupId,
  joinPrompt,
  showAskPrompt,
  showJoinPrompt,
  toggleJoinGroup,
  viewMessage,
}) => (
  <div className="group-item">
    {showAskPrompt && <div
      className="group-button ask-to-join"
      onClick={() => askToJoin({ discussionGroupId })}
      dangerouslySetInnerHTML={{ __html: askPrompt }}
    />}

    <div>
      {canView && <Link to={`/community-groups/${discussionGroupId}`}>
        <div
          className="group-button go-to-group"
          onClick={() => {}}
          dangerouslySetInnerHTML={{ __html: viewMessage }}
        />
      </Link>}
      {showJoinPrompt && <div
        className="group-button join-or-leave"
        onClick={() => toggleJoinGroup({ discussionGroupId })}
        dangerouslySetInnerHTML={{ __html: joinPrompt }}
      />}
    </div>

    <style jsx>{`
      .group-item {
        display: flex;
        flex-direction: column;
        position: relative;
        color: ${white};
        background-color: ${darkBlueGray};
        margin: 30px;
        padding: 25px;
        width: 300px;
        height: 400px;
        text-align: center;
        align-items: center;
        align-content: center;
        justify-content: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 24px;
      }

      .group-button {
        cursor: pointer;
      }

      .ask-to-join,
      .go-to-group,
      .join-or-leave {
        padding: 15px 0;
      }

      .join-or-leave {
        border-top: 1px solid ${white};
      }

      :global(a) .go-to-group,
      :global(a:visited) .go-to-group,
      :global(a:active) .go-to-group {
        color: ${white};
      }

      .ask-to-join:hover,
      .join-or-leave:hover,
      :global(a:hover) .go-to-group {
        color: ${pink};
      }

    `}</style>
  </div>
);

HoverView.propTypes = {
  askPrompt: string,
  askToJoin: func.isRequired,
  canView: bool,
  discussionGroupId: string,
  joinPrompt: string,
  showAskPrompt: bool,
  showJoinPrompt: bool,
  viewMessage: string,
};
HoverView.defaultProps = {
  askPrompt: '',
  canView: false,
  discussionGroupId: '',
  joinPrompt: '',
  showAskPrompt: false,
  showJoinPrompt: false,
  viewMessage: string,
};
export default HoverView;
