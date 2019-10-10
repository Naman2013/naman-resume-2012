interface ImageFileData {
  Instrument: string;
  'Observation date': string;
  'Observation time': string;
  Observatory: string;
  'Photo by': string;
  'Scheduled by': string;
  Telescope: string;
}

interface ImageDetails extends StandardResponse {
  avatarURL: string;
  displayName: string;
  canDownloadFlag: boolean;
  canEditFlag: boolean;
  canLikeFlag: boolean;
  canShareFlag: boolean;
  commentsCount: number;
  commentsForumId: number | string;
  commentsThreadId: number | string;
  commentsTopicId: number | string;
  customerImageId: number | string;
  domeId: number | string;
  fileData: ImageFileData;
  gravityEarnedInThisRequest: boolean;
  gravityRankLabel: string;
  iconFileData: any;
  imageDownloadFilename: string;
  imageDownloadURL: string;
  imageTitle: string;
  imageURL: string;
  likePrompt: string;
  likeTooltip: string;
  likedByMe: boolean;
  likesCount: number;
  linkUrl: string;
  linkableFileData: any;
  objectId: number | string;
  obsId: number | string;
  observationLog: string;
  observationTimeDisplay: any;
  observationTimestamp: number | string;
  observationTitle: string;
  originX: number;
  originY: number;
  photoViewFullURL: string;
  saveLabel: string;
  scheduledMissionId: number | string;
  shareTimeDisplay: any;
  shareTimestamp: number | string;
  shareToken: string;
  showCommentsLink: boolean;
  showLikePrompt: boolean;
  socialShareDescription: string;
  zoom: any;
}
