export declare interface IMissionPhotoListItem {
  imageIndex: number;
  imageTimestamp: string;
  imageId: number;
  imageURL: string;
  imageType: string;
  imageTitle: string;
  overlayText: Array<string>;
  missionDate: string;
  missionTime: string;
  displayDate: string;
  displayTime: string;
  scheduledMissionId: number;
  missionImageCount: string;
  missionOwner: string;
  fitsIsAvailable: boolean;
  galleryId: number;
  objectId: number;
  objectIconURL: string;
  missionIconURL: string;
  obsId: string;
  domeId: number;
  telescopeId: string;
  sysId: string;
  telescopeName: string;
  instrumentName: string;
}

export declare interface IProfileGroupList {
  value: string;
  label: string;
  disabled: boolean;
}

// export declare interface IShareMemberPhotoData {
//
// }
