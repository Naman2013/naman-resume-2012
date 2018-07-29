import css from 'styled-jsx/css';
import { white_tile_paper } from 'styles/variables/colors_tiles_v4';
import { shadyBottomShadow } from 'styles/variables/shadows';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    background: url(${white_tile_paper});
  }

  .guide-container {
    background: white;
  }

  .title-container {
    margin: 0;
    background: white;
  }

  @media ${screenMedium} {
    .root {
      ${shadyBottomShadow}
      padding-bottom: 60px;
    }

    .title-container {
      background: none;
    }

    .guide-container {
      margin: 0;
      margin-top: 10px;
    }
  }

  @media ${screenLarge} {
    .root {
      padding-bottom: 80px;
    }

    .guide-container {
      background: none;
      display: flex;
      margin: 0;
    }
  }
`;
