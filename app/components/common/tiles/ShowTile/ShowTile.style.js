import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { romance, golda } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    position: relative;
    width: 300px;
    height: 200px;
    box-sizing: border-box;
    padding: 0;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    color: ${romance};
    background: url('https://vega.slooh.com/assets/v4/common/show_card_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    transition: width, height 0.4s ease-in-out;
    text-align: center;
    margin: 0 auto;
  }

  .show-tile-title {
    font-family: ${secondaryFont};
    font-weight: 100;
    font-size: 20px;
    padding-top: 50px;
    width: 80%;
    margin: 0 auto;
    font-weight: 100;
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

  .show-tile-author {
    display: none;
    font-family: ${primaryFont};
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 2px;
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  .show-tile-author span {
    padding: 0 15px;
    color: #778DA8;
  }


  @media ${screenMedium} {
    .root {
      width: 100%;
      height: 350px;
      text-align: center;
    }
    .show-tile-header {
      bottom: auto;
      top: 80px; 
    }
    .show-tile-title {
      font-size: 24px;
      padding-top: 115px;
    }
    .show-tile-author {
      display: block;
      bottom: 80px;
    }
  }

  @media ${screenLarge} {
    .root {
      width: 460px;
      height: 260px;
    }
    .show-tile-header {
      bottom: auto;
      top: 60px; 
    }
    .show-tile-title {
      font-size: 22px;
      padding-top: 90px;
    }
    .show-tile-author {
      display: block;
      bottom: 60px;
    }
  }
`;
