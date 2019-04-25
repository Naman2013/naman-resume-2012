import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { romance, golda } from 'app/styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    position: relative;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    padding: 0;
    color: ${romance};
    background: url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: width, height 0.4s ease-in-out;
    text-align: center;
    margin: 20px auto;
  }

  .show-tile-title {
    font-family: ${secondaryFont};
    font-weight: 100;
    font-size: 20px;
    padding-top: 50px;
    width: 80%;
    margin: 0 auto;
    font-weight: 100;
    color: ${romance};
  }

  .show-tile-header {
    font-family: ${primaryFont};
    font-size: 10px;
    color: ${golda};
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: 400;
    position: absolute;
    margin: 0 auto;
    bottom: 40px;
    left: 0;
    right: 0;
  }
`;
