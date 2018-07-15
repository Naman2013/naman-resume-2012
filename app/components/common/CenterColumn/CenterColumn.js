import React from 'react';
import PropTypes from 'prop-types';
import generateStyle from './CenterColumn.style';
import { defaultScale } from 'styles/variables/breakpoints';

const CenterColumn = ({ children, theme, breakpoints }) => {
  const style = generateStyle(breakpoints);
  return (
    <div className="root" style={theme}>
      {children}
      <style jsx>{style}</style>
    </div>
  );
};

CenterColumn.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}),
  breakpoints: PropTypes.arrayOf(PropTypes.string),
};

CenterColumn.defaultProps = {
  theme: {},
  breakpoints: defaultScale,
};

export default CenterColumn;
