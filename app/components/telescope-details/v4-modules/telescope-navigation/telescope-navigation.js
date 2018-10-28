import React from 'react';
import PropTypes from 'prop-types';
import style from './telescope-navigation.style';

const TelescopeNavigation = ({ onSelect, selectedIndex, options }) => (
  <div>
    <form action="POST">
      <h4 className="active-selection">{options[selectedIndex].name}</h4>
      <select
        onChange={onSelect}
        value={selectedIndex}
        name="observatory"
      >
        {
          options.map((telescope, i) => <option key={`telescope-navigation-${telescope.name}`} value={i}>{telescope.name}</option>)
        }
      </select>
    </form>
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
