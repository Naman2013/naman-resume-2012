import css from 'styled-jsx/css';
import { primaryFont } from '../../../styles/variables/fonts';

export default css`
  ul {
    font-family: ${primaryFont};
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    border-bottom: 1px solid aqua;
  }
`;
