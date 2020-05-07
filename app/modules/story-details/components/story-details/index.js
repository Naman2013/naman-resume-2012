import Request from 'app/components/common/network/Request';
import { DeviceContext } from 'app/providers/DeviceProvider';
import ConnectUserAndResponseAccess from 'app/redux/components/ConnectUserAndResponseAccess';
import { STORY_DETAILS } from 'app/services/stories';
import React, { Component, Fragment } from 'react';
import { likeStory } from '../../thunks';
import BootstrappedStoryDetails from './BootstrappedStoryDetails';

export class StoryDetails extends Component {
  componentWillMount = () => {
    this.fetchData();
  };

  componentWillReceiveProps(nextProps){
    if(nextProps.params.postId !== this.props.params.postId){
      const { getStoryDetails, params } = nextProps;
      const { postId } = params;
      getStoryDetails(postId);
    }      
  }

  fetchData = () => {
    const { getStoryDetails, params } = this.props;
    const { postId } = params;
    getStoryDetails(postId);
  };

  render() {
    const { params, post, isFetching, likeStory } = this.props;
    return (
      <Fragment>
        {!isFetching && post && (
          <ConnectUserAndResponseAccess
            render={({ user, validateResponseAccess }) => (
              <Fragment>
                <DeviceContext.Consumer>
                  {context => (
                    <BootstrappedStoryDetails
                      {...this.props}
                      {...context}
                      {...post}
                      user={user}
                      likeStory={likeStory}
                    />
                  )}
                </DeviceContext.Consumer>
              </Fragment>
            )}
          />
        )}
      </Fragment>
    );
  }
}
