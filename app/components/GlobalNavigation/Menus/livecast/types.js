// flow

export type TLiveShowData = {
  description: string,
  endTime: string,
  hostName: string,
  startTime: string,
  streamCode: string,
  title: string,
};

export type TLivecastData = {
  LiveShowData: TLiveShowData,
  UpcommingShowData: Array<any>,
  apiError: boolean,
  displayTitle: string,
  errorCode: number,
  errorMsg: string,
  isLive: boolean,
  lang: string,
  statusCode: number,
  ver: string,
};
