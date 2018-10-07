import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, geyser, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../../styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from '../../../styles/variables/breakpoints';

export default css`

  .card-container__mvp {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .mvp-card {
    background-color: ${romance};
    width: 90%;
    height: 200px;
    padding: 25px;
    margin: 25px auto;
    min-width: 28%;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }
  .mvp-card h5 {
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
  }
  .mvp-card a {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
  }
  .mvp-icon {
    background-color: ${midnight_express};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 10px;
  }

  @media ${screenMedium} {

    .mvp-card {
      width: 100%;
    }
  }
`;
