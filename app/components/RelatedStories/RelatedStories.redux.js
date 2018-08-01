/***********************************
* V4 Related Stories
*
*
*
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import BootstrappedRelatedStories from './BootstrappedRelatedStories';
import { SHOW_CONTENT } from 'services/content';

const {
  bool,
  number,
  oneOfType,
  string,
} = PropTypes;
const mapStateToProps = ({
  user,
}) => ({
  user,
});

@connect(mapStateToProps, null)
class RelatedStories extends Component {
  static propTypes = {
    isDesktop: bool,
    showId: oneOfType([string, number]).isRequired,
  };
  static defaultProps = {
    isDesktop: false,
  };

  render() {
    const {
      isDesktop,
      user,
      showId,
    } = this.props;

    return (
      <Request
        authorizationRedirect={true}
        serviceURL={SHOW_CONTENT}
        method="POST"
        serviceExpiresFieldName="expires"
        requestBody={{
          cid: user.cid,
          token: user.token,
          at: user.at,
          showId,
          listType: 'sluglookupids',
        }}
        render={({
          fetchingContent,
          serviceResponse,
        }) => (
          <div>
            <DeviceContext.Consumer>
              {context => (<BootstrappedRelatedStories
                isDesktop={isDesktop}
                fetching={fetchingContent}
                user={user}
                showId={showId}
                {...context}
                {...serviceResponse}
              />)}
            </DeviceContext.Consumer>
          </div>
        )}
      />
    );
  }
}


export default RelatedStories;
