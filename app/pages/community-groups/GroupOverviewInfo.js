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
import Header from 'components/community-groups/overview/header';
import FullInformationOverview from 'components/community-groups/overview/full-information-container';
import {
  joinOrLeaveGroup,
} from 'modules/community-groups/actions';
import {
  astronaut,
  romance,
} from 'styles/variables/colors_tiles_v4';
import {
  screenSmallPx,
  screenMediumPx,
  screenLargePx,
  screenMedium,
  screenLarge,
} from 'styles/variables/breakpoints'

class CommunityGroupOverview extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  joinLeaveGroup = () => {
    const {
      routeParams: { groupId },
      actions,
    } = this.props;

    actions.joinOrLeaveGroup({
      discussionGroupId: groupId,
    })
  }

  showInformation = (e) => {
    const {
      routeParams: { groupId },
    } = this.props;
    e.preventDefault();

    browserHistory.push(`community-groups/${groupId}/info`)
  }

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
            width: ${screenSmallPx};
            color: ${astronaut};
            background-color: ${romance};
          }
          @media ${screenMedium} {
            .root {
              width: ${screenMediumPx};
            }
          }
          @media ${screenLarge} {
            .root {
              margin-top: 25px;
              width: ${screenLargePx};
            }
          }
        `}</style>
      </div>
    )
  }
}

export default CommunityGroupOverview;
