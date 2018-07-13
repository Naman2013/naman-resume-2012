import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { white_tile, astronaut, blue_tile_canvas } from 'styles/variables/colors_tiles_v4';
import { screenMedium, screenLarge, screenXLarge } from 'styles/variables/breakpoints';

export default css`
  .root {
    width: 300px;
    height: 142px;
    box-size: border-box;
    padding: 0;
    box-shadow: 0px 0px 15px 1px rgba(65,86,113,.2);
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
    border-right: 1px solid #D9DEE4;
    width: 50%;
    height: 60px;
  }

  .border {
    width: 115px;
    height: 115px;
    border: 1px dashed #D9DEE4;
    border-radius: 50%;
    margin: 0 auto;
    position: relative;
  }

  .icon {
    position: absolute;
    width: 100px;
    height: 100px;
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
    font-size: 14px;
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 18px;
    border-bottom: 1px solid #D9DEE4;
  }

  .button {
    display: block;
    padding: 0;
    padding-top: 20px;
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
  }
`;
