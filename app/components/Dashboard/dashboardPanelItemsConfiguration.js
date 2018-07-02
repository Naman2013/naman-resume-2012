import React from 'react';
import uniqueId from 'lodash/uniqueId';
import DashboardPanelItem from './DashboardPanelItem';
import RecommendedObjects from 'components/common/RecommendedObjectsSlider';
import RecommendedGuides from 'components/common/RecommendedGuidesSlider';
import RecommendedObservations from 'components/common/RecommendedObservationsSlider';
import RecommendedShows from 'components/common/RecommendedShowsSlider';
import RecommendedStories from 'components/common/RecommendedStoriesSlider';
import RecommendedGroups from 'components/common/RecommendedGroupsSlider';


const RecommendedObjectsPanel = props => (
  props.recommendedObjectsShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedObjectsHeading}
      subtitle={props.recommendedObjectsSubHeading}
      render={() => <RecommendedObjects {...props} key={uniqueId()} />}
    /> : null
);

const FeaturedObservationsPanel = props => (
  props.featuredObservationsShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.featuredObservationsHeading}
      subtitle={props.featuredObservationsSubHeading}
      render={() => <RecommendedObservations {...props} key={uniqueId()} />}
    /> : null
);

const RecommendedGuidesPanel = props => (
  props.recommendedGuidesShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedGuidesHeading}
      subtitle={props.recommendedGuidesSubHeading}
      render={() => <RecommendedGuides {...props} key={uniqueId()} />}
    /> : null
);

const RecommendedQuestsPanel = props => (
  props.recommendedQuestsShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedQuestsHeading}
      subtitle={props.recommendedQuestsSubHeading}
      render={() => <div {...props} key={uniqueId()} />}
    /> : null
);


const RecommendedShowsPanel = props => (
  props.recommendedShowsShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedShowsHeading}
      subtitle={props.recommendedShowsSubHeading}
      render={() => <RecommendedShows {...props} key={uniqueId()} />}
    /> : null
);

const RecommendedStoriesPanel = props => (
  props.recommendedStoriesShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.recommendedStoriesHeading}
      subtitle={props.recommendedStoriesSubHeading}
      render={() => <RecommendedStories {...props} key={uniqueId()} />}
    /> : null
);

const PopularGroupsPanel = props => (
  props.popularGroupsShow ?
    <DashboardPanelItem
      key={uniqueId()}
      orderNumber={props.orderNumber}
      title={props.popularGroupsHeading}
      subtitle={props.popularGroupsSubHeading}
      render={() => <RecommendedGroups {...props} key={uniqueId()} />}
    /> : null
);

export const getSectionComponent = (section, props) => {
  const sectionComponents = {
    recommendedObjects: <RecommendedObjectsPanel {...props} />,
    featuredObservations: <FeaturedObservationsPanel {...props} />,
    recommendedGuides: <RecommendedGuidesPanel {...props} />,
    // recommendedQuests: <RecommendedQuestsPanel {...props} />,
    recommendedShows: <RecommendedShowsPanel {...props} />,
    recommendedStories: <RecommendedStoriesPanel {...props} />,
    popularGroups: <PopularGroupsPanel {...props} />,
  };
  return sectionComponents[section];
};
