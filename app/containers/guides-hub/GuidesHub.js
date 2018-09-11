import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';
import Request from 'components/common/network/Request';
import BootstrappedGuidesHub from './BootstrappedGuidesHub';
import HubContainer from 'components/common/HubContainer';
import { DeviceContext } from 'providers/DeviceProvider';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';

const MOCK_DATA = {
  guideFilterOptions: [
     {
       "filterOption1": {
              name: "All Guides",
              filter: "*"
       }
     },
     {
       "filterOption2": {
              name: "Another Type",
              filter: "another"
        }
     },
     {
       "filterOption2": {
              name: "Object Type",
              filter: "objectType"
     }
   },
 ],
};

const guidesHubModel = {
  name: 'GUIDE_HUB_MODEL',
  model: resp => ({
    filterOptions: MOCK_DATA.guideFilterOptions.map(opt => values(opt)[0]).map(opt => ({ label: opt.name, value: opt.filter })),
  }),
};

const Guides = props => (
  <div>
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      model={guidesHubModel}
      // requestBody={{}}
      render={({
        fetchingContent,
        // serviceResponse,
        modeledResponses: { GUIDE_HUB_MODEL },
      }) => (
        <Fragment>
          {
            !fetchingContent &&
              <Fragment>
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...props}
                      {...GUIDE_HUB_MODEL}
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
