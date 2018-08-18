import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import style from './DisplayAtBreakpoint.style';

const DisplayAtBreakpoint = ({
  children,
  screenSmall,
  screenMedium,
  screenLarge,
  screenXLarge,
}) => (
  <div className={classnames('root', {
    screenSmall,
    screenMedium,
    screenLarge,
    screenXLarge,
  })}
  >
    {children}
    <style jsx>{style}</style>
  </div>
);

DisplayAtBreakpoint.propTypes = {
  children: PropTypes.node.isRequired,
  screenSmall: PropTypes.bool,
  screenMedium: PropTypes.bool,
  screenLarge: PropTypes.bool,
  screenXLarge: PropTypes.bool,
};

DisplayAtBreakpoint.defaultProps = {
  screenSmall: false,
  screenMedium: false,
  screenLarge: false,
  screenXLarge: false,
};

export default DisplayAtBreakpoint;
