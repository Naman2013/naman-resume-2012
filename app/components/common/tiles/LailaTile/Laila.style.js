import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  white_tile,
  astronaut,
  blue_tile_canvas,
} from 'app/styles/variables/colors_tiles_v4';
import { screenMedium } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    width: 100%;
    height: 142px;
    box-sizing: border-box;
    padding: 0;
    box-shadow: 0 0 8px 1px rgba(65, 86, 113, 0.2);
    color: ${astronaut};
    list-style-type: none;
    background: url(${white_tile});
    background-size: 30px;
    transition: width, height 0.15s ease-out;
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }

  .icon-container {
    display: none;
  }

  .center-line {
    border-right: 1px solid #d9dee4;
    width: 50%;
    height: 60px;
  }

  .border {
    width: 115px;
    height: 115px;
    border: 1px dashed #d9dee4;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
  }

  .icon {
    position: absolute;
    width: 96px;
    height: 96px;
    margin: 0 auto;
    border-radius: 50%;
    background: url(${blue_tile_canvas});
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .icon-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .title {
    padding: 30px 0 20px 0;
    margin: 0;
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 18px;
    border-bottom: 1px solid #d9dee4;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
  }

  .button-container :global(a) {
    display: block;
    padding: 0;
    color: ${astronaut};
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  @media ${screenMedium} {
    .root {
      width: 300px;
      height: 332px;
      text-align: center;
    }

    .icon-container {
      display: block;
    }

    .title {
      border-bottom: none;
      padding-top: 50px;
      padding-bottom: 0;
    }

    .button-container {
      justify-content: center;
    }

    .button-container :global(a) {
      padding-right: 10px;
    }
  }
`;
