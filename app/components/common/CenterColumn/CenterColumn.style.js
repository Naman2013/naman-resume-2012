import css from 'styled-jsx/css';
import { screenMedium, screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';
import {
  screenMediumWidth,
  screenLargeWidth,
  screenXLargeWidth,
} from './constants';

export default css`
  .root {
    width: 100%;
    margin: 0 auto;
    transition: width 0.25s;
  }

  @media ${screenMedium} {
    .root {
      width: ${screenMediumWidth}
    }
  }

  @media ${screenLarge} {
    .root {
      width: ${screenLargeWidth}
    }
  }
  @media ${screenXLarge} {
    .root {
      width: ${screenXLargeWidth}
    }
  }
`;
