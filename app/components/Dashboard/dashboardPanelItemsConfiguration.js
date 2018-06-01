import React from 'react';
import DashboardPanelItem from './DashboardPanelItem';

const RecommendedObjects = props => (
  props.recommendedObjectsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedObjectsHeading}
      subtitle={props.recommendedObjectsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const FeaturedObservations = props => (
  props.featuredObservationsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.featuredObservationsHeading}
      subtitle={props.featuredObservationsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedGuides = props => (
  props.recommendedGuidesShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedGuidesHeading}
      subtitle={props.recommendedGuidesSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedQuests = props => (
  props.recommendedQuestsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedQuestsHeading}
      subtitle={props.recommendedQuestsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedShows = props => (
  props.recommendedShowsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedShowsHeading}
      subtitle={props.recommendedShowsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedStories = props => (
  props.recommendedStoriesShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedStoriesHeading}
      subtitle={props.recommendedStoriesSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const PopularGroups = props => (
  props.popularGroupsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.popularGroupsHeading}
      subtitle={props.popularGroupsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

export const getSectionComponent = (section, props) => {
  const sectionComponents = {
    recommendedObjects: <RecommendedObjects {...props} />,
    featuredObservations: <FeaturedObservations {...props} />,
    recommendedGuides: <RecommendedGuides {...props} />,
    recommendedQuests: <RecommendedQuests {...props} />,
    recommendedShows: <RecommendedShows {...props} />,
    recommendedStories: <RecommendedStories {...props} />,
    popularGroups: <PopularGroups {...props} />,
  };
  return sectionComponents[section];
};
