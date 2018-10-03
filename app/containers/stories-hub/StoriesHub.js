import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import values from 'lodash/values';

import PaginateWithNetwork from 'components/common/paginate-with-network';
import { GET_STORIES } from 'services/content';

import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import GuideTiles from 'components/stories-hub/guide-tiles';
import { STORY_DETAILS } from 'services/stories/index';
import { DeviceContext } from 'providers/DeviceProvider';
import { goldCompass } from 'styles/variables/iconURLs';
import style from './stories-hub.style';

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

const storiesHubModel = {
  name: 'STORIES_HUB_MODEL',
  model: resp => ({
    filterOptions: MOCK_DATA.guideFilterOptions.map(opt => values(opt)[0]).map(opt => ({ label: opt.name, value: opt.filter })),
    sortOptions: MOCK_DATA.guideSortOptions.map(opt => values(opt)[0]).map(opt => ({ label: opt.name, value: opt.sort })),
  }),
};

class Guides extends Component {
  static propTypes = {
    params: PropTypes.shape({
      guideId: PropTypes.string.isRequired,
    }).isRequired,
  }

  handlePaginationResponse(resp) {
    console.log(resp);
  }

  state = { currentPage: 1 }

  handlePaginationChange = ({ activePage }) => {
    this.setState({ currentPage: activePage });
  }

  render() {
    const { currentPage } = this.state;

    return (
      <div>
        <Request
          serviceURL={STORY_DETAILS}
          model={storiesHubModel}
          requestBody={{}}
          render={({
            fetchingContent,
            modeledResponses: { STORIES_HUB_MODEL },
          }) => (
            <Fragment>
              {
                !fetchingContent &&
                  <Fragment>
                    <DeviceContext.Consumer>
                      {context => (
                        <Fragment>
                          <HubContainer
                            {...this.props}
                            {...STORIES_HUB_MODEL}
                            {...context}
                            iconURL={goldCompass}
                            hubTitle="Guides"
                          />
                          <GuideTiles stories={guideTiles} />
                          <div className="pagination-container">
                            <PaginateWithNetwork
                              apiURL={GET_STORIES}
                              activePageNumber={currentPage}
                              onServiceResponse={this.handlePaginationResponse}
                              onPaginationChange={this.handlePaginationChange}
                              filterOptions={{
                                sortBy: 'recent',
                                page: currentPage,
                              }}
                            />
                          </div>
                        </Fragment>
                      )}
                    </DeviceContext.Consumer>
                  </Fragment>
              }
            </Fragment>
          )}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}

export default Guides;
