import React from 'react';
import uniqueId from 'lodash/uniqueId';
import DashboardPanelItem from './DashboardPanelItem';
import { RecommendedObjects } from '../common/RecommendedObjectsSlider/RecommendedObjectsSlider';
import RecommendedGuides from '../common/RecommendedGuidesSlider';
import RecommendedObservations from '../common/RecommendedObservationsSlider';
import RecommendedShows from '../common/RecommendedShowsSlider';
import RecommendedStories from '../common/RecommendedStoriesSlider';
import RecommendedGroups from '../common/RecommendedGroupsSlider';
import RecommendedQuests from '../common/RecommendedQuestsSlider';

const RecommendedObjectsPanel = props =>
  props.recommendedObjectsShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedObjectsHeading}
      subtitle={props.recommendedObjectsSubHeading}
      render={() => <RecommendedObjects {...props} />}
    />
  ) : null;

const FeaturedObservationsPanel = props =>
  props.featuredObservationsShow ? (
    <DashboardPanelItem
     
      orderNumber={props.orderNumber}
      title={props.featuredObservationsHeading}
      subtitle={props.featuredObservationsSubHeading}
      render={() => <RecommendedObservations {...props} />}
    />
  ) : null;

const RecommendedGuidesPanel = props =>
  props.recommendedGuidesShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedGuidesHeading}
      subtitle={props.recommendedGuidesSubHeading}
      render={() => <RecommendedGuides {...props} />}
    />
  ) : null;

const RecommendedQuestsPanel = props =>
  props.recommendedQuestsShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedQuestsHeading}
      subtitle={props.recommendedQuestsSubHeading}
      render={() => <RecommendedQuests {...props} />}
    />
  ) : null;

const RecommendedShowsPanel = props =>
  props.recommendedShowsShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedShowsHeading}
      subtitle={props.recommendedShowsSubHeading}
      render={() => <RecommendedShows {...props} />}
    />
  ) : null;

const RecommendedStoriesPanel = props =>
  props.recommendedStoriesShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.recommendedStoriesHeading}
      subtitle={props.recommendedStoriesSubHeading}
      render={() => <RecommendedStories {...props} />}
    />
  ) : null;

const PopularGroupsPanel = props =>
  props.popularGroupsShow ? (
    <DashboardPanelItem
      orderNumber={props.orderNumber}
      title={props.popularGroupsHeading}
      subtitle={props.popularGroupsSubHeading}
      render={() => <RecommendedGroups {...props} />}
    />
  ) : null;

export const getSectionComponent = (section, props) => {
  const sectionComponents = {
    recommendedObjects: <RecommendedObjectsPanel {...props} />,
    featuredObservations: (
      <FeaturedObservationsPanel {...props} />
    ),
    recommendedGuides: <RecommendedGuidesPanel {...props} />,
    recommendedQuests: <RecommendedQuestsPanel {...props} />,
    recommendedShows: <RecommendedShowsPanel {...props} />,
    recommendedStories: <RecommendedStoriesPanel {...props} />,
    popularGroups: <PopularGroupsPanel {...props} />,
  };
  return sectionComponents[section];
};
