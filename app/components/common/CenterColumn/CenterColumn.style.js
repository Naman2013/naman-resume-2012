import css from 'styled-jsx/css';
import { defaultScale } from 'styles/variables/breakpoints';
import { defaultWidths } from './constants';

export default function generateStyle(breakpoints = defaultScale, widths = defaultWidths) {
  return css`
    .root {
      width: 100%;
      margin: 0 auto;
      transition: width 0.25s;
    }

    @media ${breakpoints[0]} {
      .root {
        width: ${widths[0]}
      }
    }

    @media ${breakpoints[1]} {
      .root {
        width: ${widths[1]}
      }
    }
    @media ${breakpoints[2]} {
      .root {
        width: ${widths[2]}
      }
    }
  `;
}
