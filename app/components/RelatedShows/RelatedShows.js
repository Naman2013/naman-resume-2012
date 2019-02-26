/** *********************************
 * V4 Related Shows
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes, { shape } from 'prop-types';

import BootstrappedRelatedShows from './BootstrappedRelatedShows';
import { RELATED_SHOWS } from '../../services/events';
import Request from '../common/network/Request';
import BlueLineDrop from '../common/BlueLineDrop';

const { bool, number, oneOfType, string } = PropTypes;

class RelatedShows extends Component {
  static propTypes = {
    isDesktop: bool,
    isScreenLarge: bool,
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number]),
    serviceURL: string,
    maxCount: number,
    user: shape({}).isRequired,
    title: string,
  };

  static defaultProps = {
    isDesktop: false,
    isScreenLarge: false,
    showId: null,
    slugLookupId: null,
    serviceURL: RELATED_SHOWS,
    maxCount: 3,
    title: '',
  };

  render() {
    const {
      isDesktop,
      isScreenLarge,
      user,
      showId,
      slugLookupId,
      serviceURL,
      title,
      maxCount,
    } = this.props;

    return (
      <Request
        authorizationRedirect
        serviceURL={serviceURL}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          slugLookupId,
          showId,
          maxCount,
        }}
        render={({ fetchingContent, serviceResponse }) =>
          !fetchingContent && // TODO: make common fields for api
          (serviceResponse.showCount > 0 ||
            serviceResponse.relatedShowsCount > 0) && (
            <BlueLineDrop
              title={`${title} (${serviceResponse.showCount ||
                serviceResponse.relatedShowsCount}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <BootstrappedRelatedShows
                  relatedShowsList={
                    serviceResponse.showList || serviceResponse.relatedShowsList
                  }
                  showCount={
                    serviceResponse.showCount ||
                    serviceResponse.relatedShowsCount
                  }
                />
              )}
            />
          )
        }
      />
    );
  }
}

export default RelatedShows;
