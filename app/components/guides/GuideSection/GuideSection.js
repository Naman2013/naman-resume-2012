import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import style from './GuideSection.style';

const GuideSection = ({
  content,
  column,
  guideId,
}) => (
  <div className="root">
    <div className="column-container">{column({ guideId })}</div>
    <div className="content-container">{content({ guideId })}</div>

    <style jsx>{style}</style>
  </div>
);

GuideSection.propTypes = {
  content: PropTypes.func.isRequired,
  column: PropTypes.func,
  guideId: PropTypes.string.isRequired,
};

GuideSection.defaultProps = {
  column: noop,
};

export default GuideSection;
