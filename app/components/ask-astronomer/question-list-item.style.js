import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';
import { faintShadow } from 'app/styles/variables/shadows';

export default css`
  .shadowed-container {
    ${faintShadow}
  }

  .margin {
    margin: 15px 0;
  }

`;
