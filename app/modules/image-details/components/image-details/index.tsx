import React, { Component } from 'react';
import { Spinner } from 'app/components/spinner/index';
import { CALLSOURCE_PHOTOVIEW } from 'app/modules/image-details/components/imageDetailsConfiguration';
import { DeviceContext } from 'app/providers/DeviceProvider';
import { IProfileGroupList } from 'app/modules/profile-photos/types';
import ImageDetailsContent from './image-details';
import './styles.scss';
import { API } from 'app/api';
import { getUserInfo } from 'app/modules/User';
import noop from 'lodash/noop';

type TProfileActivityProps = {
  getImageDetails: (data: any) => Promise<any>;
  validateResponseAccess: (data: any) => Promise<any>;
  setObservationTags: (data: any) => Promise<any>;
  shareMemberPicture: (data: any) => Promise<any>;
  getProfileGroupList: (data: any) => Promise<any>;

  observationTagsError: any;
  imageDetailsData: ImageDetails;
  isFetching: boolean;
  shareMemberPhotoData: any;
  params: any;
  user: User;
  profileGroupList: IProfileGroupList;
  location: any;
  change: Function,
};

type TProfileActivityState = {
  option: string
}

export class ImageDetails extends Component<TProfileActivityProps, TProfileActivityState> {

  static defaultProps = {
    change: noop,
  };

  constructor(props: TProfileActivityProps){
    super(props);
    if(props.location !== undefined && props.location.state !== undefined)
      this.state={option: props.location.state.option};
    
  }

  componentWillReceiveProps(newProps: any){
    
    if(this.props.imageDetailsData !== newProps.imageDetailsData && newProps.imageDetailsData.apiError !== undefined && this.state !== null)
    { 
      switch(this.state.option)
      {

        case "Write observation":
          setTimeout(()=>window.scrollTo(
            0,
            document.getElementById('img-details-obs-form').offsetTop
          ), 500);          
          break;

        case "Share Image":
          setTimeout(()=>window.scrollTo(
            0,
            document.getElementById('image-main-container').offsetTop
          ), 500); 
          break;
      }
    }
    
    if(newProps.imageDetailsData!==undefined && this.props.imageDetailsData !== newProps.imageDetailsData && newProps.imageDetailsData.markImageAsViewed)
    {
          
      const {at, cid, token} = getUserInfo();
      API.post("/api/images/markCustomerImageAsViewed", {at, cid, token, customerImageId: newProps.imageDetailsData.customerImageId}).then(response=>{
        const res=response.data;        
        if(!res.apiError){
          this.props.change('imageDetailsData', {markImageAsViewed: false, ...newProps.imageDetailsData});
        }
      })
    }
    
  }

  render() {
    const {
      getImageDetails,
      setObservationTags,
      shareMemberPicture,
      getProfileGroupList,
      user,
      observationTagsError,
      validateResponseAccess,
      params: { customerImageId, scheduledMissionId, shareToken },
      imageDetailsData,
      isFetching,
      shareMemberPhotoData,
      profileGroupList,
    } = this.props;
    const actions = {
      getImageDetails,
      setObservationTags,
      shareMemberPicture,
      getProfileGroupList,
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
                profileGroupList={profileGroupList}
              />
            </div>
          )}
        </DeviceContext.Consumer>
      </div>
    );
  }
}
