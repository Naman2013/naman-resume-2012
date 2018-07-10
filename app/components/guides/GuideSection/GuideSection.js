import React from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { screenMedium, screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';
import style from './GuideSection.style';

// responsible for positioning content at various breakpoints
const LEFT = 'left';
const RIGHT = 'right';

function getFlexDirection(alignment = LEFT) {
  return (alignment === LEFT) ? 'row' : 'row-reverse';
}

const GuideSection = ({ content, column, alignContent }) => (
  <div className="root">
    <div className="column-container">{column()}</div>
    <div className="content-container">{content()}</div>

    <style jsx>{style}</style>
    <style jsx>
      {`
        @media ${screenLarge} {
          .root {
            flex-direction: ${getFlexDirection(alignContent)};
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
};

GuideSection.defaultProps = {
  column: noop,
  alignContent: 'left',
};

export default GuideSection;
