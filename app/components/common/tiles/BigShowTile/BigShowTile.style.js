import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { romance, golda, yellow } from 'app/styles/variables/colors_tiles_v4';

export default css`
  .card-shows {
    pointer-events: auto;
    background-image: url('https://vega.slooh.com/assets/v4/dashboard/show-card-bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
    font-weight: 600;
    letter-spacing: 1px;
    padding: 0 40px;
    font-size: 10px;
    height: 259px;
    width: 600px;
    color: ${romance};
    margin: 20px auto;
    font-family: ${primaryFont};
    text-align: center;
  }
  .show-card-head {
    color: ${yellow};
    font-family: ${primaryFont};
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    font-weight: bold;
    padding: 60px 0 20px 0;
  }
  .show-card-title {
   color: ${romance};
    font-family: ${secondaryFont};
    font-size: 24px;
    font-weight: 300;
    letter-spacing: 0;
    line-height: 24px;
    text-transform: none;
    max-width: 80%;
    margin: 0 auto 55px auto;
  }
  .show-card-author {
    color: ${romance};
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  .show-card-author span {
    padding: 0 10px;
    color: #778da8;
  }
`;
