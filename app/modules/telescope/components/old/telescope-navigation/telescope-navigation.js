import React, { Fragment } from 'react';
import DisplayAtBreakpoint from 'app/components/common/DisplayAtBreakpoint';
import {
  SmallScreenFormat,
  MediumScreenFormat,
  LargeScreenFormat,
} from './index';
import { enhancedProps } from './common-prop-types';
import style from './telescope-navigation.style';

const TelescopeNavigation = props => {
  // painting fields requires an option to be available
  const {
    title,
    options,
    selectedIndex,
    activeInstrumentID,
    currentInstrumentName,
    updateCurrentInstrument,
  } = props;
  if (!(options && options.length)) return null;

  return (
    <Fragment>
      <DisplayAtBreakpoint screenLarge screenXLarge>
        <LargeScreenFormat
          options={options}
          selectedIndex={selectedIndex}
          activeInstrumentID={activeInstrumentID}
          updateCurrentInstrument={updateCurrentInstrument}
        />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenMedium>
        <MediumScreenFormat
          title={title}
          options={options}
          selectedIndex={selectedIndex}
          activeInstrumentID={activeInstrumentID}
          currentInstrumentName={currentInstrumentName}
          updateCurrentInstrument={updateCurrentInstrument}
        />
      </DisplayAtBreakpoint>

      <DisplayAtBreakpoint screenSmall>
        <div className="small-format-box">
          <SmallScreenFormat
            options={options}
            selectedIndex={selectedIndex}
            activeInstrumentID={activeInstrumentID}
            currentInstrumentName={currentInstrumentName}
            updateCurrentInstrument={updateCurrentInstrument}
          />
        </div>
      </DisplayAtBreakpoint>
      <style jsx>{style}</style>
    </Fragment>
  );
};

TelescopeNavigation.propTypes = enhancedProps;

TelescopeNavigation.defaultProps = {
  options: [],
};

export { TelescopeNavigation };
