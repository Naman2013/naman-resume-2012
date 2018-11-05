import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import style from './GuideSection.style';

const GuideSection = ({
  content,
  column,
  guideId,
  theme,
}) => (
  <div className="root" style={theme}>
    <div className="column-container">{column({ guideId })}</div>
    <div className="content-container">{content({ guideId })}</div>

    <style jsx>{style}</style>
  </div>
);

GuideSection.propTypes = {
  content: PropTypes.func.isRequired,
  column: PropTypes.func,
  guideId: PropTypes.string.isRequired,
  theme: PropTypes.shape({}),
};

GuideSection.defaultProps = {
  column: noop,
  theme: {},
};

export default GuideSection;
