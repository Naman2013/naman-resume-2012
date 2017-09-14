import React from 'react';
import PropTypes from 'prop-types';
import { brightGreen } from '../../styles/variables/colors';

const NavigationTab = ({ width }) => (
  <div className="tab" style={{ width }}>
    <style jsx>{`
      .tab {
        height: 1px;
        background-color: ${brightGreen}
      }
    `}</style>
  </div>
);

NavigationTab.defaultProps = {
  width: '14px',
};

NavigationTab.propTypes = {
  width: PropTypes.string,
};

export default NavigationTab;
