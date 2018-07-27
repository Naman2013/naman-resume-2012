import css from 'styled-jsx/css';
import { white_tile_paper } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    background: url(${white_tile_paper});
  }

  .guide-container {
    background: white;
    padding-bottom: 60px;
  }

  .title-container {
    margin: 0;
    background: white;
  }

  @media ${screenMedium} {
    .title-container {
      background: none;
    }

    .guide-container {
      margin: 0;
      margin-top: 10px;
    }
  }

  @media ${screenLarge} {
    .guide-container {
      background: none;
    }
  }
`;
