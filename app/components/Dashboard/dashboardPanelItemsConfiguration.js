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
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.featuredObservationsHeading}
      subtitle={props.featuredObservationsSubHeading}
      render={() => <RecommendedObservations {...props} key={uniqueId()} />}
    />
  ) : null;

const RecommendedGuidesPanel = props =>
  props.recommendedGuidesShow ? (
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedGuidesHeading}
      subtitle={props.recommendedGuidesSubHeading}
      render={() => <RecommendedGuides {...props} key={uniqueId()} />}
    />
  ) : null;

const RecommendedQuestsPanel = props =>
  props.recommendedQuestsShow ? (
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedQuestsHeading}
      subtitle={props.recommendedQuestsSubHeading}
      render={() => <RecommendedQuests {...props} key={uniqueId()} />}
    />
  ) : null;

const RecommendedShowsPanel = props =>
  props.recommendedShowsShow ? (
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedShowsHeading}
      subtitle={props.recommendedShowsSubHeading}
      render={() => <RecommendedShows {...props} key={uniqueId()} />}
    />
  ) : null;

const RecommendedStoriesPanel = props =>
  props.recommendedStoriesShow ? (
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedStoriesHeading}
      subtitle={props.recommendedStoriesSubHeading}
      render={() => <RecommendedStories {...props} key={uniqueId()} />}
    />
  ) : null;

const PopularGroupsPanel = props =>
  props.popularGroupsShow ? (
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.popularGroupsHeading}
      subtitle={props.popularGroupsSubHeading}
      render={() => <RecommendedGroups {...props} key={uniqueId()} />}
    />
  ) : null;

export const getSectionComponent = (section, props) => {
  const sectionComponents = {
    recommendedObjects: <RecommendedObjectsPanel {...props} />,
    featuredObservations: (
      <FeaturedObservationsPanel {...props} key={uniqueId()} />
    ),
    recommendedGuides: <RecommendedGuidesPanel {...props} key={uniqueId()} />,
    recommendedQuests: <RecommendedQuestsPanel {...props} key={uniqueId()} />,
    recommendedShows: <RecommendedShowsPanel {...props} key={uniqueId()} />,
    recommendedStories: <RecommendedStoriesPanel {...props} key={uniqueId()} />,
    popularGroups: <PopularGroupsPanel {...props} key={uniqueId()} />,
  };
  return sectionComponents[section];
};
