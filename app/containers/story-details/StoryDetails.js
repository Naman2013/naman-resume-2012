import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Request from 'components/common/network/Request';
import { DeviceContext } from 'providers/DeviceProvider';
import ConnectUserAndResponseAccess from 'redux/components/ConnectUserAndResponseAccess';
import { STORY_DETAILS } from 'services/stories';
import BootstrappedStoryDetails from './BootstrappedStoryDetails';

const storyModel = {
  name: 'STORY_DETAILS_MODEL',
  model: (resp) => {
    const post = resp.posts[0] || {};
    return ({
      ...post,
    });
  },
};

const StoryDetail = props => (
  <div>
    <Request
      serviceURL={STORY_DETAILS}
      model={storyModel}
      requestBody={{
        postId: props.params.postId,
      }}
      render={({
        fetchingContent,
        modeledResponses: { STORY_DETAILS_MODEL },
      }) => (
        <Fragment>
          {
            !fetchingContent &&
            <ConnectUserAndResponseAccess
              render={({ user, validateResponseAccess }) => (
                <Fragment>
                  <DeviceContext.Consumer>
                    {context => (
                      <BootstrappedStoryDetails
                        {...props}
                        {...context}
                        {...STORY_DETAILS_MODEL}
                        user={user}
                      />
                    )}
                  </DeviceContext.Consumer>
              </Fragment>
              )} />
          }
        </Fragment>
      )}
    />
  </div>
);

StoryDetail.propTypes = {
  params: PropTypes.shape({
    postId: PropTypes.string.isRequired,
  }).isRequired,
};

export default StoryDetail;
