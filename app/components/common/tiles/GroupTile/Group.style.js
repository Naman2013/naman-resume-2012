import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { romance, hawkesBlue, astronaut, blue_tile_canvas } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .root {
    width: 300px;
    height: 370px;
    background-image: url("https://vega.slooh.com/assets/v4/dashboard/group-card-bg.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%;
    color: ${romance};
    font-weight: 600;
    letter-spacing: 1px;
    transition: width, height 0.15s ease-out;
    padding: 0 40px;
    font-size: 10px;
    margin: 20px auto;
    font-family: ${primaryFont};
    text-align: center;
  }
  .card-groups-img {
    background-image: url("https://vega.slooh.com/assets/v4/dashboard/group-graphic-1.png");
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
    font-size: 22px;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 15px;
  }

  .card-desc {
    text-transform: uppercase;
  }
`;
