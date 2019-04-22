import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  .pagination-root {
    display: flex;
    justify-content: center;
  }

  .buttons {
    ${resetMarginPadding}
    display: flex;
    list-style-type: none;
  }

  .button {
    padding: 0 5px;
  }
`;
