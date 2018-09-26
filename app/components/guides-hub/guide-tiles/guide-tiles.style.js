import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';

export default css`
  .guide-tiles-root {
    ${resetMarginPadding}
    list-style-type: none;
    margin-top: 10px;
  }

  .tile {
    margin-bottom: 10px;
    padding: 0 10px;
  }
`;
