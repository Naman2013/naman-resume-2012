import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import StoryTiles from 'components/stories-hub/stories-tiles';
import Request from 'components/common/network/Request';
import HubContainer from 'components/common/HubContainer';
import Button from 'components/common/style/buttons/Button';
import { STORIES_PAGE_ENDPOINT_URL, STORIES_ENDPOINT_URL } from 'services/stories';
import { DeviceContext } from 'providers/DeviceProvider';
import { validateResponseAccess } from 'modules/authorization/actions'
import style from './stories-hub.style';
import messages from './StoriesHub.messages';

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
    intl: intlShape.isRequired,
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

  updateReadingListInStories = (id, resData) => {
    let newStoriesList = [].concat(this.state.stories);

    newStoriesList = newStoriesList.map((story) => {
      if (story.postId === id) {
        return Object.assign(story, resData);
      }
      return story;
    });

    this.setState(() => ({
      stories: newStoriesList,
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

  clearStories = () => {
    this.setState({
      stories: [],
    });
  }

  render() {
    const {
      user,
      actions,
      intl,
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
                      user={user}
                      validateResponseAccess={actions.validateResponseAccess}
                      updateList={this.updateStoriesList}
                      appendToList={this.appendToStoriesList}
                      iconURL={serviceResponse.pageIconURL}
                      pageTitle={serviceResponse.pageTitle}
                      filterType={this.props.params.filterType}
                      responseFieldNames={{
                        currentCount: 'storiesCount',
                        totalCount: 'totalStoriesCount',
                      }}
                      clearTiles={this.clearStories}
                      renderRightMenu={() => (
                        <div className="flex">
                          <Button text={intl.formatMessage(messages.submitStory)} onClickEvent={() => browserHistory.push(`/stories/${this.props.params.filterType}/create`)} />
                        </div>
                      )}
                      render={() => (
                        <Fragment>
                          {fetchingContent ? <div>{intl.formatMessage(messages.loading)}</div> : null}
                          {!fetchingContent && stories.length ?
                            <StoryTiles
                              stories={stories}
                              updateReadingListInfo={this.updateReadingListInStories}
                              isMobile={context.isMobile} /> : <div>{intl.formatMessage(messages.noStories)}</div>}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Stories));
