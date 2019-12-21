export declare interface IObservatory {
  [key: string]: any;
  obsIndex: number;
  obsId: string;
  obsUniqueId: string;
  obsStatus: string;
  obsMenuName: string;
  obsName: string;
  obsLogoURL: string;
  obsHeroURL: string;
  obsDetailsURL: string;
  obsShortName: string;
  obsRelatedGuideURL: string;
  obsLatitudeText: string;
  obsLongitudeText: string;
  obsAltitude: string;
  obsHemisphere: string;
  obsHemisphereAbbrev: string;
  obsObservatoryCode: string;
  obsObservatoryType: string;
  obsDescription: string;
  showCountdown: boolean;
  countdownLabel: string;
  countdownSeconds: number;
  countdownTimestamp: number;
  WeatherWidgetId: string;
  MoonPhaseWidgetId: string;
  MoonlightBarWidgetId: string;
  DayNightBarPanelWidgetId: string;
  MiniWeatherPanelWidgetId: string;
  WeatherConditionsWidgetId: string;
  MissionControlStatusWidgetId: string;
  SeeingConditionsWidgetId: string;
  SatelliteWidgetId: string;
  MapWidgetId: string;
  AllskyWidgetId: string;
  AllskyTimelapseWidgetId: string;
  FacilityWebcamWidgetId: string;
  FacilityWebcamTimelapseWidgetId: string;
  DomecamWidgetId: string;
  DomecamTimelapseWidgetId: string;
  CurrentConditionsWidgetId: string;
  DayNightBarWidgetId: string;
  DayNightMapWidgetId: string;
  RecommendsIconWidgetId: string;
  SkyChartWidgetId: string;
  obsDaylight: boolean;
  obsAlert: string;
  obsTelescopeCount: number;
  debugObservatoriesId: number;
}

export declare interface IObservatoryList extends StandardResponse {
  callSource: string;
  showAds: string;
  observatoryListType: string;
  observatoryListCount: number;
  observatoryListStatus: string;
  observatoryListTimestamp: string;
  observatoryList: Array<IObservatory>;
}

export declare interface IDomeCam extends StandardResponse {
  obsId: string;
  widgetUniqueId: string;
  title: string;
  subtitle: string;
  credits: string;
  widgetWidth: string;
  widgetHeight: string;
  imageWidth: string;
  imageHeight: string;
  offsetTop: string;
  offsetLeft: string;
  operation: string;
  onlineStatus: string;
  offlineImageURL: string;
  refreshIntervalSec: number;
  expires: number;
  domeCamURL: string;
  [key: string]: any;
}
