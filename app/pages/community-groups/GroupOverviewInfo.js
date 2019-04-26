/***********************************
 * V4 Community Group Overview Page
 *
 *
 *
 ***********************************/

import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { DeviceContext } from 'providers/DeviceProvider';
import Header from 'app/components/community-groups/overview/header';
import FullInformationOverview from 'app/components/community-groups/overview/full-information-container';
import { joinOrLeaveGroup } from 'app/modules/community-groups/actions';
import { astronaut, romance } from 'app/styles/variables/colors_tiles_v4';
import {
  SCREEN_SMALL,
  SCREEN_MEDIUM,
  SCREEN_LARGE,
  screenMedium,
  screenLarge,
} from 'app/styles/variables/breakpoints';

class CommunityGroupOverview extends Component {
  static propTypes = {};

  static defaultProps = {};

  joinLeaveGroup = () => {
    const {
      routeParams: { groupId },
      actions,
    } = this.props;

    actions.joinOrLeaveGroup({
      discussionGroupId: groupId,
    });
  };

  showInformation = e => {
    const {
      routeParams: { groupId },
    } = this.props;
    e.preventDefault();

    browserHistory.push(`community-groups/${groupId}/info`);
  };

  render() {
    const {
      communityGroupOverview,
      pageMeta,
      routeParams: { groupId },
      actions,
    } = this.props;
    return (
      <div className="root">
        <Header
          showInformation={this.showInformation}
          joinOrLeaveGroup={this.joinLeaveGroup}
          discussionGroupId={groupId}
          {...communityGroupOverview}
          {...pageMeta}
        />
        <DeviceContext.Consumer>
          {context => (
            <FullInformationOverview
              joinOrLeaveGroup={this.joinLeaveGroup}
              context={context}
            />
          )}
        </DeviceContext.Consumer>
        <style jsx>{`
          .root {
            margin: 0 auto;
            width: ${SCREEN_SMALL}px;
            color: ${astronaut};
            background-color: ${romance};
          }
          @media ${screenMedium} {
            .root {
              width: ${SCREEN_MEDIUM}px;
            }
          }
          @media ${screenLarge} {
            .root {
              margin-top: 25px;
              width: ${SCREEN_LARGE}px;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default CommunityGroupOverview;
