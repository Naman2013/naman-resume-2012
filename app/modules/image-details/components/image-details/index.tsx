import React, { Component } from 'react';
import { Spinner } from 'app/components/spinner/index';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import { DeviceContext } from 'app/providers/DeviceProvider';
import ImageDetailsContent from './image-details';
import './styles.scss';

type TProfileActivityProps = {
  getImageDetails: (data: any) => Promise<any>;
  validateResponseAccess: (data: any) => Promise<any>;
  setObservationTags: (data: any) => Promise<any>;
  shareMemberPicture: (data: any) => Promise<any>;

  observationTagsError: any;
  imageDetailsData: ImageDetails;
  isFetching: boolean;
  shareMemberPhotoData: any;
  params: any;
  user: User;
};

export class ImageDetails extends Component<TProfileActivityProps> {
  render() {
    const {
      getImageDetails,
      setObservationTags,
      shareMemberPicture,
      user,
      observationTagsError,
      validateResponseAccess,
      params: { customerImageId, scheduledMissionId, shareToken },
      imageDetailsData,
      isFetching,
      shareMemberPhotoData,
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
          {(context: any) => (
            <div
              key={`image-details-${customerImageId}`}
              className="container mt-5 image-details"
            >
              <ImageDetailsContent
                actions={actions}
                observationTagsError={observationTagsError}
                callSource={CALLSOURCE_PHOTOVIEW}
                scheduledMissionId={scheduledMissionId}
                user={user}
                validateResponseAccess={validateResponseAccess}
                shareMemberPhotoData={shareMemberPhotoData}
                shareToken={shareToken}
                {...context}
                {...imageDetailsData}
                customerImageId={customerImageId}
              />
            </div>
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}
