import css from 'styled-jsx/css';
import { defaultScale } from 'styles/variables/breakpoints';
import {
  screenMediumWidth,
  screenLargeWidth,
  screenXLargeWidth,
} from './constants';

export default function generateStyle(breakpoints = defaultScale) {
  return css`
    .root {
      width: 100%;
      margin: 0 auto;
      transition: width 0.25s;
    }

    @media ${breakpoints[0]} {
      .root {
        width: ${screenMediumWidth}
      }
    }

    @media ${breakpoints[1]} {
      .root {
        width: ${screenLargeWidth}
      }
    }
    @media ${breakpoints[2]} {
      .root {
        width: ${screenXLargeWidth}
      }
    }
  `;
}
