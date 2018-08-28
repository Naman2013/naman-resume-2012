import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import BootstrappedGuidesHub from './BootstrappedGuidesHub';
import HubContainer from 'components/common/HubContainer';
import { DeviceContext } from 'providers/DeviceProvider';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

const Guides = () => (
  <div>
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      // model={{}}
      // requestBody={{}}
      render={({
        fetchingContent,
        serviceResponse,
        // modeledResponses: { SUBJECT_GUIDE_MODEL },
      }) => (
        <Fragment>
          {
            !fetchingContent &&
              <Fragment>
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...serviceResponse}
                      {...context}
                      hubTitle="Guides"
                    />
                  )}
                </DeviceContext.Consumer>
              </Fragment>
          }
        </Fragment>
      )}
    />
  </div>
);

Guides.propTypes = {
  params: PropTypes.shape({
    guideId: PropTypes.string.isRequired,
  }).isRequired,
};

export default Guides;
