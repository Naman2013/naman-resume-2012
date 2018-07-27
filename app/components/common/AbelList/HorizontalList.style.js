import css from 'styled-jsx/css';
import { astronaut, glitter } from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';

const FONT_SIZE = 11;
const TOTAL_HEIGHT = 70;
const VERTICAL_PADDING = (TOTAL_HEIGHT - FONT_SIZE) / 2;

export default css`
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    font-family: ${primaryFont};
    color: ${astronaut};
    text-transform: uppercase;
    border-top: 1px solid ${glitter};
    border-bottom: 1px solid ${glitter};
  }

  li {
    flex-grow: 1;
    font-weight: bold;
    padding: ${VERTICAL_PADDING}px 0;
    padding-left: 30px;
    font-size: ${FONT_SIZE}px;
    border-right: 1px solid ${glitter};
    letter-spacing: 0.4px;
  }

  li:last-child {
    border-right: none;
  }
`;
