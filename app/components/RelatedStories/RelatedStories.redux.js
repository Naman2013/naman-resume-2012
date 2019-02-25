/** *********************************
 * V4 Related Stories
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import BootstrappedRelatedStories from './BootstrappedRelatedStories';
import { CONTENT_RELATED_STORIES } from 'services/content';

const {
  bool, number, oneOfType, string,
} = PropTypes;
const mapStateToProps = ({ user }) => ({
  user,
});

@connect(
  mapStateToProps,
  null,
)
class RelatedStories extends Component {
  static propTypes = {
    isDesktop: bool,
    postId: oneOfType([string, number]),
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number]),
    serviceUrl: string,
    maxCount: number,
  };
  static defaultProps = {
    isDesktop: false,
    postId: null,
    slugLookupId: null,
    showId: null,
    serviceUrl: CONTENT_RELATED_STORIES,
    maxCount: 3,
  };

  render() {
    const {
      isDesktop, user, showId, serviceUrl, stories, fetchingContent,
    } = this.props;

    return (
      <div>
        <DeviceContext.Consumer>
          {context => (
            <BootstrappedRelatedStories
              isDesktop={isDesktop}
              fetching={fetchingContent}
              user={user}
              {...context}
              {...stories}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default RelatedStories;
