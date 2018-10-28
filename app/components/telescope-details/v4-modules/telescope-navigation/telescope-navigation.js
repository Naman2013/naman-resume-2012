import React from 'react';
import PropTypes from 'prop-types';
import { SmallScreenFormat } from './';
import style from './telescope-navigation.style';

const TelescopeNavigation = ({ onSelect, selectedIndex, options }) => (
  <div>
    <SmallScreenFormat onSelect={onSelect} selectedIndex={selectedIndex} options={options} />
    <style jsx>{style}</style>
  </div>
);

TelescopeNavigation.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnailURL: PropTypes.string.isRequired,
  })),
};

TelescopeNavigation.defaultProps = {
  options: [],
};

export { TelescopeNavigation };
