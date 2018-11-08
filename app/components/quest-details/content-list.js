import React from 'react';
import PropTypes from 'prop-types';
import AbelList from '../common/AbelList';
import ResourcesButton from './resources-button.redux';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import style from './content-list.style';

const ContentList = ({ list, resourcesProps, showResources }) => (
  <div className="root">
    <AbelList theme={{ horizontalList: { boxShadow: 'inset 0px 5px 20px -5px #e0e0e0' } }} list={list} />
    <DisplayAtBreakpoint
      screenSmall
      screenLarge
      screenXLarge
    >
      {showResources ? <ResourcesButton {...resourcesProps} /> : null}
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
  showResources: PropTypes.bool.isRequired,
};

ContentList.defaultProps = {
  list: [],
};

export default ContentList;
