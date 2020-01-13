export declare interface IAboutSection {
  name: string;
  link: string;
}

export declare interface IAboutData extends StandardResponse {
  aboutSloohPageHeading1: string;
  aboutSloohIconUrl: string;
  aboutSloohSectionsList: Array<IAboutSection>;
  aboutSloohSectionsListCount: number;
}

export declare interface IAboutNewsStory {
  title: string;
  author: string;
  iconURL: string;
  hasLink: boolean;
  linkUrl: string;
}

export declare interface IAboutNewsStories {
  sectionHeading: string;
  sectionHeading2: string;
  newsStoriesList?: Array<IAboutNewsStory>;
}

export declare interface IAboutSubMenuItems {
  title: string;
  linkUrl: string;
}

export declare interface ISectionPanel {
  panelId: number;
  panelNumber: number;
  panelTitle: string;
  panelSubtitle: string;
  showPanelTitle: boolean;
  showPanelSubtitle: boolean;
  content_device_small: string;
  content_device_medium: string;
  content_device_large: string;
}

export declare interface IAboutPartnerLogoListItem {
  imageUrl: string;
  hasLink: boolean;
  linkUrl: string;
}

export declare interface IAboutPartners {
  sectionHeading: string;
  sectionHeading2: string;
  partnerLogoList: Array<IAboutPartnerLogoListItem>;
}

export declare interface IAboutNewsStore {
  sectionHeading: string;
  sectionHeading2: string;
  linkUrl: string;
  imageUrl: string;
}

export declare interface IAboutSectionData extends StandardResponse {
  sectionId: number;
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  panelCount: number;
  sectionPanels: Array<ISectionPanel>;
  aboutSloohSectionsList: Array<IAboutSection>;
  hasAboutSloohHeroImage: boolean;
  aboutSloohHeroImageUrl: string;
  hasAboutSloohPartners: boolean;
  aboutSloohPartners: IAboutPartners;
  hasAboutSloohNewsStories: boolean;
  aboutSloohNewsStories: IAboutNewsStories;
  hasAboutSloohStore: boolean;
  aboutSloohStore: IAboutNewsStore;
  subMenuCount: number;
  subMenuItems?: Array<IAboutSubMenuItems>;
}
