import React, { Component } from 'react';
import { Chevron } from 'app/atoms/icons';
import { TelescopeNavigation } from './index';
import { minProps } from './common-prop-types';
import TelescopNavigationDropDown from './TelescopNavigationDropDown';

import style from './small-screen-format.style';

const SmallScreenFormat = props => {
  const {
    selectedIndex,
    options,
    activeInstrumentID,
    currentInstrumentName,
    updateCurrentInstrument
  } = props;
  const formatedOptions = options.map((o, i) => {
    return {
      label: o.name,
      value: i,
      thumbnailURL: o.thumbnailURL,
      observatoryUniqueID: o.observatoryUniqueID,
      telescopeUniqueID: o.telescopeUniqueID,
      instruments: o.instruments
    }
  });

  return (options && options.length) ? (
    <div className="small-screen-select">
      <div className="active-selection-box">
        <div
          className="image-container"
          style={{
            backgroundImage: `url(${options[selectedIndex].thumbnailURL})`,
          }}
        />
        <h4 className="active-selection-title">
          <span>{options[selectedIndex].name} - </span>
          <span>{currentInstrumentName}</span>
        </h4>
        <aside className="chevron-box">
          <Chevron />
        </aside>
      </div>
      <TelescopNavigationDropDown
        options={formatedOptions}
        selectedIndex={selectedIndex}
        activeInstrumentID={activeInstrumentID}
        updateCurrentInstrument={updateCurrentInstrument}
      />
      <style jsx>{style}</style>
    </div>
  ) : null;
};

SmallScreenFormat.propTypes = minProps;
SmallScreenFormat.defaultProps = TelescopeNavigation.defaultProps;

export { SmallScreenFormat };
