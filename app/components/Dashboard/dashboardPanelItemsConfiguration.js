import React from 'react';
import DashboardPanelItem from './DashboardPanelItem';
import RecommendedObjects from 'components/common/RecommendedObjects';

const RecommendedObjectsPanel = props => (
  props.recommendedObjectsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedObjectsHeading}
      subtitle={props.recommendedObjectsSubHeading}
      render={() => <RecommendedObjects {...props} />}
    /> : null
);

const FeaturedObservationsPanel = props => (
  props.featuredObservationsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.featuredObservationsHeading}
      subtitle={props.featuredObservationsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedGuidesPanel = props => (
  props.recommendedGuidesShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedGuidesHeading}
      subtitle={props.recommendedGuidesSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedQuestsPanel = props => (
  props.recommendedQuestsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedQuestsHeading}
      subtitle={props.recommendedQuestsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedShowsPanel = props => (
  props.recommendedShowsShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedShowsHeading}
      subtitle={props.recommendedShowsSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const RecommendedStoriesPanel = props => (
  props.recommendedStoriesShow ?
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedStoriesHeading}
      subtitle={props.recommendedStoriesSubHeading}
      render={() => <div {...props} />}
    /> : null
);

const PopularGroupsPanel = props => (
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
    recommendedObjects: <RecommendedObjectsPanel {...props} />,
    featuredObservations: <FeaturedObservationsPanel {...props} />,
    recommendedGuides: <RecommendedGuidesPanel {...props} />,
    recommendedQuests: <RecommendedQuestsPanel {...props} />,
    recommendedShows: <RecommendedShowsPanel {...props} />,
    recommendedStories: <RecommendedStoriesPanel {...props} />,
    popularGroups: <PopularGroupsPanel {...props} />,
  };
  return sectionComponents[section];
};
