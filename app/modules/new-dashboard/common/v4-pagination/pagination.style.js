import css from 'styled-jsx/css';
import { resetMarginPadding } from 'app/styles/variables/utils';

export default css`
  .pagination-root {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .buttons {
    ${resetMarginPadding}
    display: flex;
    list-style-type: none;
    align-items: center;
  }

  .button {
    padding: 0 5px;
    cursor: pointer;
  }

  .disabled{
    color: #6B6B6B;
  }

  .active{
    color: #FFFFFF;
  }

  .rotate-180{
    transform: rotate(180deg);
  }
  
`;
