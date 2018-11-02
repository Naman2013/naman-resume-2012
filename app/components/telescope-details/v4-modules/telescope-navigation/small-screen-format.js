import React from 'react';
import { Chevron } from 'atoms/icons';
import { TelescopeNavigation } from './';
import { minProps } from './common-prop-types';
import style from './small-screen-format.style';

const SmallScreenFormat = ({ onSelect, selectedIndex, options }) => (
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
    <style jsx>{style}</style>
  </div>
);

SmallScreenFormat.propTypes = minProps;
SmallScreenFormat.defaultProps = TelescopeNavigation.defaultProps;

export { SmallScreenFormat };
