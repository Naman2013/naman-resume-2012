import Request from 'app/components/common/network/Request';
import { DeviceContext } from 'app/providers/DeviceProvider';
import ConnectUserAndResponseAccess from 'app/redux/components/ConnectUserAndResponseAccess';
import { STORY_DETAILS } from 'app/services/stories';
import React, { Component, Fragment } from 'react';
import BootstrappedStoryDetails from './BootstrappedStoryDetails';

// todo get rid of it
const storyModel = {
  name: 'STORY_DETAILS_MODEL',
  model: resp => {
    const post = resp.posts[0] || {};
    return {
      ...post,
    };
  },
};

export class StoryDetails extends Component {
  componentWillMount = () => {
    this.fetchData();
  };

  fetchData = () => {
    const { getStoryDetails, params } = this.props;
    const { postId } = params;
    console.log('fetching data');
    getStoryDetails(postId);
  };

  render() {
    const { params } = this.props;
    return (
      <div>
        <Request
          serviceURL={STORY_DETAILS}
          model={storyModel}
          requestBody={{
            postId: params.postId,
          }}
          render={({
            fetchingContent,
            modeledResponses: { STORY_DETAILS_MODEL },
          }) => (
            <Fragment>
              {!fetchingContent && (
                <ConnectUserAndResponseAccess
                  render={({ user, validateResponseAccess }) => (
                    <Fragment>
                      <DeviceContext.Consumer>
                        {context => (
                          <BootstrappedStoryDetails
                            {...this.props}
                            {...context}
                            {...STORY_DETAILS_MODEL}
                            user={user}
                          />
                        )}
                      </DeviceContext.Consumer>
                    </Fragment>
                  )}
                />
              )}
            </Fragment>
          )}
        />
      </div>
    );
  }
}
