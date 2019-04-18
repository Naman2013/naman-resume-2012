import css from 'styled-jsx/css';
import { blue_tile_feat } from 'app/styles/variables/colors_tiles_v4';
import { screenMedium } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    padding-bottom: 40px;
  }

  @media ${screenMedium} {
    .root {
      background: url(${blue_tile_feat});
    }
  }
`;
