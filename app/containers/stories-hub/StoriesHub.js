import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StoryTiles from 'components/stories-hub/stories-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import ShowMoreWithNetwork from 'components/common/show-more-with-network';
import { STORIES_PAGE_ENDPOINT_URL, STORIES_ENDPOINT_URL } from 'services/stories';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './stories-hub.style';

const COUNT = 9;
const DEFAULT_PAGE = 1;


const storiesHubModel = {
  name: 'STORIES_HUB_MODEL',
  model: resp => ({
    filterOptions: resp.navigationConfig,
    sortOptions: resp.filterOptions.options,
  }),
};

class Stories extends Component {
  static propTypes = {
    validateResponseAccess: PropTypes.func,
    params: PropTypes.shape({
      filterType: PropTypes.string,
    }),
  };

  static defaultProps = {
    validateResponseAccess: noop,
    params: {
      filterType: 'all'
    },
  };

  state = {
    stories: [],
  };

  updateStoriesList = (resData) => {
    this.setState(() => ({
      stories: resData.storiesList,
    }));
  }

  appendToStoriesList = (resData) => {
    this.setState((state) => {
      const stories = [].concat(state.stories, resData.storiesList)
      return {
        stories
      };
    });
  }

  render() {
    const {
      user,
      actions,
    } = this.props;
    const {
      stories
    } = this.state;
    return (<div>
      <Request
        serviceURL={STORIES_PAGE_ENDPOINT_URL}
        model={storiesHubModel}
        requestBody={{}}
        render={({
          fetchingContent,
          modeledResponses: { STORIES_HUB_MODEL },
          serviceResponse = {},
        }) => (
          <Fragment>
            {
              !fetchingContent &&
                <DeviceContext.Consumer>
                  {context => (
                    <HubContainer
                      {...this.props}
                      {...STORIES_HUB_MODEL}
                      {...context}
                      hubName="stories"
                      paginateURL={STORIES_ENDPOINT_URL}
                      page={DEFAULT_PAGE}
                      count={COUNT}
                      updateList={this.updateStoriesList}
                      appendToList={this.appendToStoriesList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      render={props => (
                        <Fragment>
                          {fetchingContent ? <div>Loading</div> : null}
                          {!fetchingContent && stories.length ? <StoryTiles stories={stories} isMobile={context.isMobile} /> : <div>There are no stories.</div>}
                          {context.isMobile ?
                            <div className="pagination-container">
                              <ShowMoreWithNetwork
                                apiURL={STORIES_ENDPOINT_URL}
                                activePageNumber={Number(props.page)}
                                onServiceResponse={props.handleShowMoreResponse}
                                onPaginationChange={props.handleShowMoreChange}
                                responseFieldNames={{
                                  currentCount: 'storiesCount',
                                  totalCount: 'totalStoriesCount',
                                }}
                                validateResponseAccess={actions.validateResponseAccess}
                                user={user}
                                filterOptions={{
                                  sortBy: props.sort,
                                  type: props.filterType,
                                  count: 5,
                                }}
                              />
                            </div>
                          : null}
                        </Fragment>
                      )}
                    />
                  )}
                </DeviceContext.Consumer>
            }
          </Fragment>
        )}
      />
      <style jsx>{style}</style>
    </div>)
  }
}



const mapStateToProps = ({
  user,
}) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    validateResponseAccess,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
