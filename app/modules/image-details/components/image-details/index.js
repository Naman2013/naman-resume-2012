import Request from 'app/components/common/network/Request';
import {
  CALLSOURCE_PHOTOVIEW,
  USE_SHARE_TOKEN_TRUE,
} from 'app/modules/image-details/components/imageDetailsConfiguration';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { IMAGE_DETAILS } from 'app/services/images';
import React, { Component } from 'react';
import BoostrappedImageDetails from '../BootstrappedImageDetails';

export class ImageDetails extends Component {
  static propTypes = {};

  static defaultProps = {};

  render() {
    const {
      actions,
      user,
      params: { customerImageId, scheduledMissionId, shareToken },
    } = this.props;

    return (
      <div>
        <Request
          authorizationRedirect
          serviceURL={IMAGE_DETAILS}
          method="POST"
          serviceExpiresFieldName="expires"
          requestBody={{
            callSource: CALLSOURCE_PHOTOVIEW,
            customerImageId,
            shareToken,
            useShareToken: USE_SHARE_TOKEN_TRUE,
          }}
          render={({ fetchingContent, serviceResponse }) => (
            <div>
              <DeviceContext.Consumer>
                {context => (
                  <BoostrappedImageDetails
                    actions={actions}
                    callSource={CALLSOURCE_PHOTOVIEW}
                    customerImageId={customerImageId}
                    user={user}
                    {...context}
                    {...serviceResponse}
                  />
                )}
              </DeviceContext.Consumer>
            </div>
          )}
        />
      </div>
    );
  }
}
