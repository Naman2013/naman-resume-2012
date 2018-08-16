import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { screenLarge } from '../../../styles/variables/breakpoints';
import style from './GuideSection.style';

const LEFT = 'left';
const RIGHT = 'right';

function getFloat(contentAlignment = LEFT) {
  return (contentAlignment === LEFT) ? LEFT : RIGHT;
}

function getMargin(contentAlignment = LEFT) {
  return (contentAlignment === LEFT) ? 'margin-right: 100px;' : 'margin-left: 100px;';
}

const GuideSection = ({
  content,
  column,
  alignContent,
  guideId,
}) => (
  <div className="root">
    <div className="column-container">{column({ guideId })}</div>
    <div className="content-container">{content({ guideId })}</div>

    <style jsx>{style}</style>
    <style jsx>
      {`
        @media ${screenLarge} {
          .column-container {
            float: ${getFloat(alignContent)};
            ${getMargin(alignContent)}
            margin-bottom: 40px;
            width: 30%;
          }
        }
      `}
    </style>
  </div>
);

GuideSection.propTypes = {
  content: PropTypes.func.isRequired,
  column: PropTypes.func,
  alignContent: PropTypes.oneOf([LEFT, RIGHT]),
  guideId: PropTypes.string.isRequired,
};

GuideSection.defaultProps = {
  column: noop,
  alignContent: 'left',
};

export default GuideSection;
