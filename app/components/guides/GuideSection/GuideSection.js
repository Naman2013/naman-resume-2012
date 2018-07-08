import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

const GuideSection = ({ content, column, contentAlign }) => (
  <div />
);

GuideSection.propTypes = {
  content: PropTypes.string.isRequired,
  column: PropTypes.func,
  alignContent: PropTypes.oneOf(['left', 'right']),
};

GuideSection.defaultProps = {
  column: noop,
  alignContent: 'left',
};

export default GuideSection;
