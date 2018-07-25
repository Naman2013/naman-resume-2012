import css from 'styled-jsx/css';
import { white_tile_paper } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    background: url(${white_tile_paper});
  }

  .guide-container {
    background: white;
  }

  @media ${screenLarge} {
    .guide-container {
      background: none;
    }
  }
`;
