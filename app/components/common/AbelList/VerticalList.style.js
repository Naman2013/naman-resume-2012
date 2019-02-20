import css from 'styled-jsx/css';
import { astronaut, glitter } from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';

export default css`
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    text-transform: uppercase;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.6px;
    padding: 20px 0;
    border-bottom: 1px solid ${glitter};
    font-family: ${primaryFont};
    color: ${astronaut};
  }

  .bullet-image {
    margin-right: 10px;
  }
`;
