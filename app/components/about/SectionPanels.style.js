import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  ul {
    ${resetMarginPadding}
    list-style-type: none;
    margin: 0 auto;
  }

  li {
    margin-bottom: 10px;
  }
`;
