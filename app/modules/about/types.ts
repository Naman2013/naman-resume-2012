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

export declare interface IAboutSectionData extends StandardResponse {
  sectionId: number;
  sectionTag: string;
  sectionTitle: string;
  sectionSubtitle: string;
  panelCount: number;
  aboutSloohSectionsList: Array<IAboutSection>;
  hasAboutSloohHeroImage: boolean;
  aboutSloohHeroImageUrl: string;
  hasAboutSloohPartners: boolean;
  hasAboutSloohNewsStories: boolean;
  aboutSloohNewsStories?: Array<IAboutNewsStories>;
  subMenuCount: number;
  subMenuItems?: Array<IAboutSubMenuItems>;
}
