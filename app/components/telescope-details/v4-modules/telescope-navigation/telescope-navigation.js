import React from 'react';
import PropTypes from 'prop-types';
import { Chevron } from 'atoms/icons';
import style from './telescope-navigation.style';

const TelescopeNavigation = ({ onSelect, selectedIndex, options }) => (
  <div>

    <div className="small-screen-select">
      <form action="POST">
        <div className="active-selection-box">
          <div className="image-container" style={{ backgroundImage: `url(${options[selectedIndex].thumbnailURL})` }} />
          <h4 className="active-selection-title">{options[selectedIndex].name}</h4>
          <aside className="chevron-box">
            <Chevron />
          </aside>
        </div>
        <select
          className="navigation-options"
          onChange={onSelect}
          value={selectedIndex}
          name="observatory"
        >
          {
            options.map((telescope, i) => <option key={`telescope-navigation-${telescope.name}`} value={i}>{telescope.name}</option>)
          }
        </select>
      </form>
    </div>

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
