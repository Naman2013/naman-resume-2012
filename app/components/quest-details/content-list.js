import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import ResourcesButton from './resources-button';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './content-list.style';

const ContentList = ({ list, resourcesProps, questId }) => (
  <div className="root">
    <AbelList theme={{ horizontalList: { boxShadow: 'inset 0px 5px 20px -5px #e0e0e0' } }} list={list} />
    <DisplayAtBreakpoint
      screenSmall
      screenLarge
      screenXLarge
    >
      <ResourcesButton {...resourcesProps} questId={questId} />
    </DisplayAtBreakpoint>
    <style jsx>{style}</style>
  </div>
);

ContentList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string),
  resourcesProps: PropTypes.shape({
    resourcesIconUrl: PropTypes.string.isRequired,
    resourcesButtonText: PropTypes.string.isRequired,
  }).isRequired,
  questId: PropTypes.string.isRequired,
};

ContentList.defaultProps = {
  list: [],
};

export default ContentList;
