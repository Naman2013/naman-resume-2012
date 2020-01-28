import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  romance,
  failedRomance,
  hawkesBlue,
  astronaut,
  blue_tile_canvas,
} from 'app/styles/variables/colors_tiles_v4';
import { screenMedium } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    pointer-events: auto;
    width: 300px;
    height: 370px;
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/group-card-bg.svg');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    transition: width, height 0.15s ease-out;
    padding: 0 40px;
    margin: 20px auto;
    text-align: center;
    max-width: 100%;
  }
  .card-groups-img {
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/group-graphic-1.png');
    background-size: 112px;
    background-repeat: no-repeat;
    background-position: 50%;
    width: 100%;
    height: 250px;
  }
  :global(a .card-title) {
    color: ${romance};
    text-decoration: none;
    font-family: ${secondaryFont};
    font-size: 21px;
    letter-spacing: 0;
    line-height: 21px;
    font-weight: 300;
    margin-bottom: 15px;
    text-transform: none;
  }

  .card-desc {
    color: ${failedRomance};
    font-family: ${primaryFont};
    font-size: 10px;
    letter-spacing: 2px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;
