import css from 'styled-jsx/css';
import { astronaut } from '../../../styles/variables/colors_tiles_v4';
import { primaryFont } from '../../../styles/variables/fonts';

export default css`
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.4px;
    padding: 20px 0;
    border-bottom: 1px solid ${astronaut};
    font-family: ${primaryFont};
    color: ${astronaut};
  }
`;
