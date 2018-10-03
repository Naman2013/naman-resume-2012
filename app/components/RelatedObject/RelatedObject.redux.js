/***********************************
* V4 Related Object
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import has from 'lodash/has';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import BootstrappedRelatedObject from './BootstrappedRelatedObject';
import { CONTENT_RELATED_OBJECTS } from 'services/content';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;

const RelatedObject = ({
  isDesktop,
  user,
  slugLookupId,
  serviceUrl,
}) => (
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
      maxCount: 1,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => {
      const firstObject = (has(serviceResponse.relatedObjectsList) && serviceResponse.relatedObjectsList[0]) || {}
      return (
        <div>
          <DeviceContext.Consumer>
            {context => (<BootstrappedRelatedObject
              isDesktop={isDesktop}
              fetching={fetchingContent}
              relatedObjectsCount={serviceResponse.relatedObjectsCount}
              user={user}
              {...context}
              {...firstObject}
            />)}
          </DeviceContext.Consumer>
        </div>
      )
    }}
  />
);

RelatedObject.propTypes = {
  isDesktop: bool,
  slugLookupId: oneOfType([string, number]),
  serviceUrl: string,
};
RelatedObject.defaultProps = {
  isDesktop: false,
  serviceUrl: CONTENT_RELATED_OBJECTS,
};

const mapStateToProps = ({
  user,
}) => ({
  user,
});

export default connect(mapStateToProps, null)(RelatedObject);
