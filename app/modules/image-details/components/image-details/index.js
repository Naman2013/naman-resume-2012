import { Spinner } from 'app/components/spinner/index';
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

  componentDidMount = () => this.fetchData();

  fetchData = () => {
    const {
      getImageDetails,
      params: { customerImageId, shareToken },
    } = this.props;
    return getImageDetails({
      callSource: CALLSOURCE_PHOTOVIEW,
      customerImageId,
      shareToken,
      useShareToken: USE_SHARE_TOKEN_TRUE,
    });
  };

  render() {
    const {
      getImageDetails,
      setObservationTags,
      shareMemberPicture,
      user,
      observationTagsError,
      validateResponseAccess,
      params: { customerImageId, scheduledMissionId },
      imageDetailsData,
      isFetching,
    } = this.props;
    const actions = {
      getImageDetails,
      setObservationTags,
      shareMemberPicture,
    };
    return (
      <div>
        <Spinner loading={isFetching} />
        <DeviceContext.Consumer>
          {context => (
            <BoostrappedImageDetails
              actions={actions}
              observationTagsError={observationTagsError}
              callSource={CALLSOURCE_PHOTOVIEW}
              customerImageId={customerImageId}
              scheduledMissionId={scheduledMissionId}
              user={user}
              validateResponseAccess={validateResponseAccess}
              refetchData={this.fetchData}
              {...context}
              {...imageDetailsData}
            />
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}
