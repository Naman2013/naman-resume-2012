import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

// responsible for positioning content at various breakpoints
const LEFT = 'left';
const RIGHT = 'right';

const GuideSection = ({ content, column, alignContent }) => (
  <div>
    {
      (alignContent === LEFT)
        ? ([content, column()].join(''))
        : ([column(), content].join(''))
    }
  </div>
);

GuideSection.propTypes = {
  content: PropTypes.func.isRequired,
  column: PropTypes.func,
  alignContent: PropTypes.oneOf([LEFT, RIGHT]),
};

GuideSection.defaultProps = {
  column: noop,
  alignContent: 'left',
};

export default GuideSection;
