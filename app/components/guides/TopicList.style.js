import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  ul {
    ${resetMarginPadding}
    list-style-type: none;
    width: 95%;
    margin: 0 auto;
  }

  li {
    margin-bottom: 10px;
  }
`;
