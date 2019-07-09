import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
  geyser,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .nav-actions {
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 25px auto;
  }

  .observations-pagination {
    margin-bottom: 40px;
  }
`;
