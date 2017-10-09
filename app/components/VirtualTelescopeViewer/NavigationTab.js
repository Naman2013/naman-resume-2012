import React from 'react';
import PropTypes from 'prop-types';
import { brightGreen } from '../../styles/variables/colors';

const propTypes = {
  active: PropTypes.bool,
};

const defaultProps = {
  width: '14px',
  active: false,
};

const DEFAULT_HEIGHT = '1px';
const ACTIVE_HEIGHT = '3px';

function getStyle(isActive) {
  const style = { width: '14px' };
  if (isActive) {
    return Object.assign(style, { height: ACTIVE_HEIGHT });
  }

  return Object.assign(style, { height: DEFAULT_HEIGHT });
}

const NavigationTab = ({ active }) => (
  <div className="tab" style={getStyle(active)}>
    <style jsx>{`
      .tab {
        background-color: ${brightGreen}
      }
    `}</style>
  </div>
);

NavigationTab.propTypes = propTypes;
NavigationTab.defaultProps = defaultProps;

export default NavigationTab;
