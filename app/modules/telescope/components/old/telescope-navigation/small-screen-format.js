import React, { Component } from 'react';
import { Chevron } from 'app/atoms/icons';
import { TelescopeNavigation } from './index';
import { minProps } from './common-prop-types';
import TelescopNavigationDropDown from './TelescopNavigationDropDown';

import style from './small-screen-format.style';

class SmallScreenFormat extends Component {
  render() {
    const { onSelect, selectedIndex, options } = this.props;
    const formatedOptions = options.map((o, i) => ({
      label: o.name,
      value: i,
    }));
    return (
      <div className="small-screen-select">
        <div className="active-selection-box">
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${options[selectedIndex].thumbnailURL})`,
            }}
          />
          <h4 className="active-selection-title">
            {options[selectedIndex].name}
          </h4>
          <aside className="chevron-box">
            <Chevron />
          </aside>
        </div>
        <TelescopNavigationDropDown
          onSelect={onSelect}
          selectedIndex={selectedIndex}
          options={formatedOptions}
          listOfTelescopes={options}
        />
        <style jsx>{style}</style>
      </div>
    );
  }
}

SmallScreenFormat.propTypes = minProps;
SmallScreenFormat.defaultProps = TelescopeNavigation.defaultProps;

export { SmallScreenFormat };
