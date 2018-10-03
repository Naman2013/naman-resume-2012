import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import { GUIDES_PAGE_ENDPOINT_URL, GUIDES_ENDPOINT_URL } from 'services/guides/guide-data';
import { DeviceContext } from 'providers/DeviceProvider';
import BootstrappedGuidesHub from './BootstrappedGuidesHub';
import style from './guides-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const guidesHubModel = {
  name: 'GUIDE_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

const Guides = props => (
  <div>
    <Request
      serviceURL={GUIDES_PAGE_ENDPOINT_URL}
      model={guidesHubModel}
      requestBody={{}}
      render={({
        fetchingContent,
        modeledResponses: { GUIDE_HUB_MODEL },
        serviceRes = {},
      }) => (
        <Fragment>
          {
            !fetchingContent &&
              <DeviceContext.Consumer>
                {context => (
                  <HubContainer
                    {...props}
                    {...GUIDE_HUB_MODEL}
                    {...context}
                    iconURL={serviceRes.pageIconURL}
                    hubTitle={serviceRes.pageTitle}
                    filterType={props.params.filterType}
                    render={() => (
                      <Request
                        serviceURL={GUIDES_ENDPOINT_URL}
                        requestBody={{
                          count: COUNT,
                          page: DEFAULT_PAGE,
                          type: props.params.filterType,
                        }}
                        render={({
                          fetchingGuides,
                          serviceResponse,
                        }) => (
                          <BootstrappedGuidesHub
                            {...context}
                            {...serviceResponse}
                            fetching={fetchingGuides}
                            page={DEFAULT_PAGE}
                            count={COUNT}
                          />
                        )}
                      />
                    )}
                  />
                )}
              </DeviceContext.Consumer>
          }
        </Fragment>
      )}
    />
    <style jsx>{style}</style>
  </div>
);

Guides.propTypes = {
  params: PropTypes.shape({
    filterType: PropTypes.string.isRequired,
  }),
};

Guides.defaultProps = {
  params: {},
};

export default Guides;
