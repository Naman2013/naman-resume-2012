import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

export default css`

  .loader {
    display: block;
    text-align: center;
    margin: 25px;
    padding: 25px;
  }

  @media ${screenMedium} {
    .ask-astronomer {
      display: flex;
      flex-direction: row;
      padding: 10px 25px;
    }
    .loader {
      display: block;
      text-align: center;
      margin: 25px;
      padding: 25px;
    }

    .left {
      flex: 3;
    }

    .right {
      flex: 1;
    }
  }

`;
