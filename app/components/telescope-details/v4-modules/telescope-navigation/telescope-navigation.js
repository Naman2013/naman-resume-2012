import React from 'react';
import PropTypes from 'prop-types';
import DisplayAtBreakpoint from 'components/common/DisplayAtBreakpoint';
import { SmallScreenFormat, MediumScreenFormat } from './';
import { enhancedProps } from './common-prop-types';
import style from './telescope-navigation.style';

const TelescopeNavigation = ({
  onSelect,
  selectedIndex,
  options,
  title,
}) => (
  <div>
    <DisplayAtBreakpoint screenMedium>
      <MediumScreenFormat
        title={title}
        onSelect={onSelect}
        selectedIndex={selectedIndex}
        options={options}
      />
    </DisplayAtBreakpoint>

    <DisplayAtBreakpoint screenSmall>
      <div className="small-format-box">
        <SmallScreenFormat
          onSelect={onSelect}
          selectedIndex={selectedIndex}
          options={options}
        />
      </div>
    </DisplayAtBreakpoint>
    <style jsx>{style}</style>
  </div>
);

TelescopeNavigation.propTypes = enhancedProps;

TelescopeNavigation.defaultProps = {
  options: [],
};

export { TelescopeNavigation };
