import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../styles/variables/fonts';
import { hawkesBlue, romance, midnight_express, blue_tile_guides, white_tile_texture, lightHeadedAstronaut, faintGray } from '../../styles/variables/colors_tiles_v4';
import { screenLarge, screenXLarge } from '../../styles/variables/breakpoints';

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
  }
  .specialists-card {
    background-color: ${romance};
    width: 300px;
    height: 200px;
    padding: 25px;
    margin: 25px auto;
    min-width: 28%;
    box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  }
  .specialists-card h5 {
    font-family: ${secondaryFont};
    color: ${lightHeadedAstronaut};
    font-size: 20px;
    border-bottom: 1px solid ${hawkesBlue};
    padding: 15px 0;
  }
  .specialists-card a {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
  }
  .specialists-icon {
    background-color: ${midnight_express};
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding: 10px;
  }

  }
`;
