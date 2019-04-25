/***********************************
* V4 Related Object
*
*
*
***********************************/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import has from 'lodash/has';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'app/components/common/network/Request';
import BootstrappedRelatedObject from './BootstrappedRelatedObject';
import { CONTENT_RELATED_OBJECTS } from 'app/services/content';

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
    userParams={['at', 'cid', 'token']}
    serviceURL={serviceUrl}
    method="POST"
    serviceExpiresFieldName="expires"
    requestBody={{
      slugLookupId,
      maxCount: 1,
    }}
    render={({
      fetchingContent,
      serviceResponse,
    }) => {
      const firstObject = (has(serviceResponse, 'relatedObjectsList') && serviceResponse.relatedObjectsList[0]) || {};
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
