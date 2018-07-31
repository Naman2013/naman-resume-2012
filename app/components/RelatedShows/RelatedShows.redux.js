/***********************************
* V4 Related Shows
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import BootstrappedRelatedShows from './BootstrappedRelatedShows';
import { RELATED_SHOWS } from 'services/events';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;
const mapStateToProps = ({
  user,
}) => ({
  user,
});

@connect(mapStateToProps, null)
class RelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    showId: oneOfType([string, number]).isRequired,
  };
  static defaultProps = {
    isDesktop: false,
  };

  render() {
    const {
      isDesktop,
      user,
      showId,
    } = this.props;

    return (
      <Request
        authorizationRedirect={true}
        serviceURL={RELATED_SHOWS}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          showId,
        }}
        render={({
          fetchingContent,
          serviceResponse,
        }) => (
          <div>
            <DeviceContext.Consumer>
              {context => (<BootstrappedRelatedShows
                isDesktop={isDesktop}
                fetching={fetchingContent}
                user={user}
                showId={showId}
                {...context}
                {...serviceResponse}
              />)}
            </DeviceContext.Consumer>
          </div>
        )}
      />
    );
  }
}


export default RelatedShows;
