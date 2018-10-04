import css from 'styled-jsx/css';
import { resetMarginPadding } from 'styles/variables/utils';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .guide-tiles-root {
    ${resetMarginPadding}
    list-style-type: none;
    margin-top: 10px;
  }

  .tile {
    position: relative;
    ${resetMarginPadding}
    margin-bottom: 10px;
    padding: 0 10px;
  }

  .excerpt {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 10px;
  }

  .show-excerpt {
    visibility: visible;
  }

  @media ${screenMedium} {
    .guide-tiles-root {
      display: flex;
      flex-wrap: wrap;
      margin-top: 65px;
    }
  }

  @media ${screenLarge} {
    .guide-tiles-root {
      margin-top: 40px;
    }
  }
`;
