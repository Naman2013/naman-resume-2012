import css from 'styled-jsx/css';
import { white_tile_paper } from 'app/styles/variables/colors_tiles_v4';
import { shadyBottomShadow } from '../../styles/variables/shadows';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    background: url(${white_tile_paper});
  }

  .guide-container {
    background: white;
    display: flex;
  }

  .title-container {
    margin: 0;
    background: white;
  }

  @media ${screenMedium} {
    .root {
      ${shadyBottomShadow}
      position: relative;
      z-index: 1;
      padding-bottom: 60px;
    }

    .title-container {
      background: none;
    }

    .guide-container {
      margin: 0;
      margin-top: 10px;
      display: flex;
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
