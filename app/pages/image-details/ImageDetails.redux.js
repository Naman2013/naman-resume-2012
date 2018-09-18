/***********************************
* V4 Image Details Page
*   Markdown support on elements????
*   UTF-8 support....
*   Multi-National Languages.....
***********************************/


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeviceContext } from 'providers/DeviceProvider';
import Request from 'components/common/network/Request';
import { IMAGE_DETAILS } from 'services/images';
import BoostrappedImageDetails from './BootstrappedImageDetails';
import { USE_SHARE_TOKEN_TRUE, CALLSOURCE_PHOTOVIEW } from './imageDetailsConfiguration';
import { validateResponseAccess } from 'modules/authorization/actions';

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


@connect(mapStateToProps, mapDispatchToProps)
class ImageDetails extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    const {
      actions,
      user,
      params: {
        customerImageId,
        scheduledMissionId,
        shareToken,
      },
    } = this.props;

    return (
      <div>
        <Request
          authorizationRedirect={true}
          serviceURL={IMAGE_DETAILS}
          method="POST"
          serviceExpiresFieldName="expires"
          requestBody={{
            callSource: CALLSOURCE_PHOTOVIEW,
            customerImageId,
            shareToken,
            useShareToken: USE_SHARE_TOKEN_TRUE,
          }}
          render={({
            fetchingContent,
            serviceResponse,
          }) => (
            <div>
              <DeviceContext.Consumer>
                {context => (<BoostrappedImageDetails
                  actions={actions}
                  callSource={CALLSOURCE_PHOTOVIEW}
                  customerImageId={customerImageId}
                  user={user}
                  {...context}
                  {...serviceResponse}
                />)}
              </DeviceContext.Consumer>
            </div>
          )}
        />
      </div>
    );
  }
}

export default ImageDetails;
