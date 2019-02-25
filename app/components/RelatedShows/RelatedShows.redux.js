/** *********************************
 * V4 Related Shows
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import BootstrappedRelatedShows from './BootstrappedRelatedShows';
import { RELATED_SHOWS } from 'services/events';

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
class RelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number]),
    serviceUrl: string,
    maxCount: number,
  };
  static defaultProps = {
    isDesktop: false,
    showId: null,
    serviceUrl: RELATED_SHOWS,
    maxCount: 3,
  };

  render() {
    const {
      isDesktop, user, showId, shows, fetchingContent,
    } = this.props;

    return (
      <div>
        <DeviceContext.Consumer>
          {context => (
            <BootstrappedRelatedShows
              isDesktop={isDesktop}
              fetching={fetchingContent}
              user={user}
              showId={showId}
              {...context}
              {...shows}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}

export default RelatedShows;
