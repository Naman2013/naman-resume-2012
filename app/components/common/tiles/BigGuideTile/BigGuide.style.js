import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  romance,
  golda,
  midnight_express,
  astronaut,
  blue_tile_canvas,
} from 'app/styles/variables/colors_tiles_v4';
import { screenMedium } from 'app/styles/variables/breakpoints';

export default css`
  .card-guides {
    pointer-events: auto;
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/guide-card-bg.png');
    background-color: ${midnight_express};
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    padding: 0 40px;
    width: 300px;
    height: 462px;
    margin: 20px auto;
    text-align: center;
  }
  .card-guides-head {
    color: ${golda};
    font-weight: bold;
    font-family: ${primaryFont};
    font-size: 10px;
    letter-spacing: 2px;
    padding: 200px 0 20px 0;
    text-transform: uppercase;
  }
  .card-guides-title {
    color: ${romance};
    font-family: ${secondaryFont};
    font-size: 22px;
    letter-spacing: 0;
    line-height: 22px;
    font-weight: 400;
    max-width: 80%;
    margin: 0 auto;
    text-transform: none;
  }
`;
