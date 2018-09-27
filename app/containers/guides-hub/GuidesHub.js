import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';

import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import GuideTiles from 'components/guides-hub/guide-tiles';
import { GUIDE_ENDPOINT_URL } from 'services/guides/guide-data';
import { DeviceContext } from 'providers/DeviceProvider';
import { goldCompass } from 'styles/variables/iconURLs';

import BootstrappedGuidesHub from './BootstrappedGuidesHub';

const MOCK_DATA = {
  guideFilterOptions: [
    {
      filterOption1: {
        name: 'All Guides',
        filter: '*',
      },
    },
    {
      filterOption2: {
        name: 'Another Type',
        filter: 'another',
      },
    },
    {
      filterOption2: {
        name: 'Object Type',
        filter: 'objectType',
      },
    },
  ],
  guideSortOptions: [
    {
      sortOption2: {
        name: 'A-Z',
        sort: 'asc',
      },
    },
    {
      sortOption2: {
        name: 'Z-A',
        sort: 'desc',
      },
    },
  ],
};

const guideTiles = [
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
  { title: 'A guide to', subTitle: 'Object guide name', linkURL: '#' },
];

const guidesHubModel = {
  name: 'GUIDE_HUB_MODEL',
  model: resp => ({
    filterOptions: MOCK_DATA.guideFilterOptions.map(opt => values(opt)[0]).map(opt => ({ label: opt.name, value: opt.filter })),
    sortOptions: MOCK_DATA.guideSortOptions.map(opt => values(opt)[0]).map(opt => ({ label: opt.name, value: opt.sort })),
  }),
};

const Guides = props => (
  <div>
    <Request
      serviceURL={GUIDE_ENDPOINT_URL}
      model={guidesHubModel}
      requestBody={{}}
      render={({
        fetchingContent,
        modeledResponses: { GUIDE_HUB_MODEL },
      }) => (
        <Fragment>
          {
            !fetchingContent &&
              <Fragment>
                <DeviceContext.Consumer>
                  {context => (
                    <Fragment>
                      <HubContainer
                        {...props}
                        {...GUIDE_HUB_MODEL}
                        {...context}
                        iconURL={goldCompass}
                        hubTitle="Guides"
                      />
                      <GuideTiles guides={guideTiles} />
                    </Fragment>
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
