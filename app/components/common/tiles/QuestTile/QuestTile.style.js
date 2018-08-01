import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { astronaut, blue_tile_canvas } from 'styles/variables/colors_tiles_v4';

export default css`
  .root {
    width: 300px;
    height: 332px;
    text-align: center;
    box-size: border-box;
    padding: 0;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    color: ${astronaut};
    list-style-type: none;
    background: url('https://vega.slooh.com/assets/v4/common/Quest_BlueCard.png');
    background-size: cover;
    background-repeat: no-repeat;
    transition: width, height 0.15s ease-out;
    margin: 0 auto;
  }

  .container {
    width: 80%;
    margin: 0 auto;
  }


  .icon-container {
    display: block;
    position: relative;
    top: 106px;
    width: 100%;
    height: 40px;
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
    border-bottom: none;
    padding-top: 180px;
    padding-bottom: 0;
    text-transform: initial;
  }

  .button-container {
    display: flex;
    align-items: center;
    padding-top: 20px;
    justify-content: center;
  }

  .button {
    display: block;
    padding: 0;
    color: ${astronaut};
    text-decoration: none;
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
    padding-right: 10px;
  }
`;
