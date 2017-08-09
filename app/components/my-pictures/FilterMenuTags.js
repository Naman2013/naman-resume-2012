import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TagToggle from '../common/TagToggle';
import { pink } from '../../styles/variables/colors';
import 'react-tabs/style/react-tabs.scss';

const { arrayOf, number, shape, func, string } = PropTypes;
const FilterMenuTags = ({
  selectedTagsTabIndex,
  setSelectedTagsTabIndex,
  missionSystemTagsCount,
  missionUserTagsCount,
  pictureUserTagsCount,
  selectedFilters,
  missionSystemTags,
  missionUserTags,
  pictureUserTags,
  handleTagClick
}) => (
  <div className="filterMenuSection">
    <Tabs
      forceRenderTabPanel={true}
      selectedIndex={selectedTagsTabIndex}
      onSelect={tabIndex => setSelectedTagsTabIndex({ index: tabIndex })}
    >
      <TabList>
        <Tab>
          <span
            className={classnames({ hasFilters: missionSystemTagsCount > 0 })}
          >System {missionSystemTagsCount > 0 && <span>({missionSystemTagsCount})</span>}</span>
        </Tab>
        <Tab>
          <span
            className={classnames({ hasFilters: missionUserTagsCount > 0 })}
          >Mission {missionUserTagsCount > 0 && <span>({missionUserTagsCount})</span>}</span>
        </Tab>
        <Tab>
          <span
            className={classnames({ hasFilters: pictureUserTagsCount > 0 })}
          >Picture {pictureUserTagsCount > 0 && <span>({pictureUserTagsCount})</span>}</span>
        </Tab>
      </TabList>

      <TabPanel>
        <TagToggle
          activeTags={selectedFilters.missionSystemTags}
          param="missionSystemTags"
          tagList={missionSystemTags.tagsList}
          handleTagClick={handleTagClick}
        />
      </TabPanel>
      <TabPanel>
        <TagToggle
          activeTags={selectedFilters.missionUserTags}
          param="missionUserTags"
          tagList={missionUserTags.tagsList}
          handleTagClick={handleTagClick}
        />
      </TabPanel>
      <TabPanel>
        <TagToggle
          activeTags={selectedFilters.pictureUserTags}
          param="pictureUserTags"
          tagList={pictureUserTags.tagsList}
          handleTagClick={handleTagClick}
        />
      </TabPanel>
    </Tabs>

    <style jsx>
      {`
        .filterMenuSection :global(.react-tabs__tab) .hasFilters {
          color: ${pink};
        }

      `}
    </style>
  </div>
);

FilterMenuTags.defaultProps = {
};
FilterMenuTags.propTypes = {
  selectedTagsTabIndex: number.isRequired,
  setSelectedTagsTabIndex: func.isRequired,
  missionSystemTagsCount: number.isRequired,
  missionUserTagsCount: number.isRequired,
  pictureUserTagsCount: number.isRequired,
  selectedFilters: shape({
    dateFilter: string,
    pierNumber: string,
    observatoryId: string,
    filterType: string,
    timeFilter: number,
  }).isRequired,
  missionSystemTags: shape({
    tagsList: arrayOf(string)
  }).isRequired,
  missionUserTags: shape({
    tagsList: arrayOf(string)
  }).isRequired,
  pictureUserTags: shape({
    tagsList: arrayOf(string)
  }).isRequired,
  handleTagClick: func.isRequired
};

export default FilterMenuTags;
