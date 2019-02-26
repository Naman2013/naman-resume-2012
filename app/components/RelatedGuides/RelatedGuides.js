/** *********************************
 * V4 Related Shows
 *
 *
 *
 ********************************** */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Request from '../common/network/Request';
import BlueLineDrop from '../common/BlueLineDrop';
import BootstrappedRelatedGuides from './BootstrappedRelatedGuides';
import { RELATED_GUIDES } from '../../services/events';

const { bool, number, oneOfType, string, shape } = PropTypes;

class RelatedGuides extends Component {
  static propTypes = {
    isDesktop: bool,
    slugLookupId: oneOfType([string, number]),
    showId: oneOfType([string, number]),
    serviceURL: string,
    maxCount: number,
    user: shape({}).isRequired,
    title: string,
  };

  static defaultProps = {
    isDesktop: false,
    showId: null,
    slugLookupId: null,
    serviceURL: RELATED_GUIDES,
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
          maxCount,
          showId,
        }}
        render={({ fetchingContent, serviceResponse }) =>
          !fetchingContent &&
          (serviceResponse.relatedGuidesCount > 0 ||
            serviceResponse.guideCount > 0) && (
            <BlueLineDrop
              title={`${title} (${serviceResponse.relatedGuidesCount ||
                serviceResponse.guideCount}) `}
              isDesktop={isDesktop}
              theme={{ margin: isScreenLarge ? '25px 0' : '25px' }}
              render={() => (
                <BootstrappedRelatedGuides
                  relatedGuidesList={
                    serviceResponse.relatedGuidesList ||
                    serviceResponse.guideList
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

export default RelatedGuides;
