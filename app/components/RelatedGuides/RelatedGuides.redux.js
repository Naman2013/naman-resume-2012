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
import BootstrappedRelatedGuides from './BootstrappedRelatedGuides';
import { RELATED_GUIDES } from 'services/events';

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
class RelatedGuides extends Component {
  static propTypes = {
    serviceUrl: string,
    isDesktop: bool,
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number])
  };
  static defaultProps = {
    serviceUrl: RELATED_GUIDES,
    isDesktop: false,
    showId: null,
    slugLookupId: null,
  };

  render() {
    const {
      serviceUrl,
      isDesktop,
      user,
      slugLookupId,
      showId,
    } = this.props;

    return (
      <Request
        authorizationRedirect={true}
        serviceURL={serviceUrl}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          slugLookupId,
          showId,
        }}
        render={({
          fetchingContent,
          serviceResponse,
        }) => (
          <div>
            <DeviceContext.Consumer>
              {context => (<BootstrappedRelatedGuides
                isDesktop={isDesktop}
                fetching={fetchingContent}
                user={user}
                slugLookupId={slugLookupId}
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


export default RelatedGuides;
