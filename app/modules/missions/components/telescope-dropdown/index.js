import React, { Component } from 'react';
import { Chevron } from 'app/atoms/icons';
import TelescopNavigationDropDown from '../../../telescope/components/old/telescope-navigation/TelescopNavigationDropDown';

import './styles.scss';

export class TelescopeDropdown extends Component {
  customOption = ({ innerRef, innerProps, children, value }, telescopeList) => {
    return (
      <div ref={innerRef} {...innerProps} className="dropdown-opt">
        <div className="dropdown-name">
          <img
            className="option-icon"
            src={telescopeList[value].teleLogoURL}
            alt=""
          />
          {children}
        </div>
      </div>
    );
  };

  onSelect = ({ value }) => {
    const { onSelect, telescopeList } = this.props;
    onSelect(telescopeList[value]);
  };

  render() {
    const { onSelect, selectedTelescope, telescopeList } = this.props;
    const formatedOptions = telescopeList.map((item, index) => ({
      label: item.teleName,
      value: index,
    }));

    return (
      <div className="telescope-dropdown">
        <div className="active-selection-box">
          <div
            className="image-container"
            style={{
              backgroundImage: `url(${selectedTelescope.teleLogoURL})`,
            }}
          />
          <h4 className="active-selection-title">
            {selectedTelescope.teleName}
          </h4>
          <aside className="chevron-box">
            <Chevron />
          </aside>
        </div>
        <TelescopNavigationDropDown
          onSelect={this.onSelect}
          selectedIndex={selectedTelescope.teleId}
          options={formatedOptions}
          listOfTelescopes={telescopeList}
          customOption={this.customOption}
        />
      </div>
    );
  }
}
