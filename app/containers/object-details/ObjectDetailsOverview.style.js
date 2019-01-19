import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { screenMedium, screenLarge } from '../../styles/variables/breakpoints';
import {
  hawkesBlue,
  romance,
  lightHeadedAstronaut,
  faintGray,
  midnight_express,
  blue_tile_guides,
  white_tile_texture,
} from '../../styles/variables/colors_tiles_v4';

export default css`
  .contain {
    margin: 5%;
    padding: 25px;
    background-color: #f2f2f2;
  }

  .white-paper-bg {
    padding: 80px 0;
    background: url(${white_tile_texture});
    background-size: 16px;
  }

  .blue-tile-bg {
    text-align: center;
    background-image: url(${blue_tile_guides});
    background-size: 100px;
    padding: 40px 0 100px 0;
  }

  .off-white-bg {
    background-color: ${faintGray};
    padding-bottom: 50px;
  }

  .off-white-bg-top-shadow {
    background-color: ${faintGray};
    box-shadow: inset 0 10px 30px 10px rgba(237, 240, 242, 0.7);
  }

  h1 {
    font-size: 30px;
    font-weight: 600;
    border-bottom: solid 4px ${lightHeadedAstronaut};
    color: ${lightHeadedAstronaut};
    font-family: ${secondaryFont};
    font-weight: 400;
    padding-bottom: 30px;
  }

  .card-container__specialists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-left: -10px;
    margin-right: -10px;
  }

  .card-container__specialists > :global(*) {
    width: 100%;
    padding: 0 10px;
    margin: 0 10px;
  }

  .error-message {
    text-align: center;
    padding-bottom: 50px;
  }

  @media ${screenMedium} {
    .card-container__specialists > :global(*) {
      margin: 0;
    }
  }

  @media ${screenLarge} {
    .card-container__specialists > :global(*) {
      width: 33%;
      margin: 0;
    }
  }
`;
