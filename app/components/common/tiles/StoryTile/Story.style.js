import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { romance, hawkesBlue, astronaut, blue_tile_canvas } from 'styles/variables/colors_tiles_v4';
import { screenMedium } from 'styles/variables/breakpoints';

export default css`
  .root {
    width: 300px;
    height: 370px;
    text-align: center;
    box-sizing: border-box;
    padding: 10px;
    box-shadow: 0px 0px 8px 1px rgba(65,86,113,.2);
    color: ${astronaut};
    list-style-type: none;
    background-color: ${romance};
    background-size: 30px;
    transition: width, height 0.15s ease-out;
  }

  .container {
    width: 280px;
    height: 350px;
    border: 1px solid ${hawkesBlue};
    position: relative;
  }

  .icon-container {
    display: block;
  }

  .story-top {
    position: absolute;
    top: 20px;
    color: ${astronaut};
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 10px;
    letter-spacing: 2px;
  }

  .story-top:first-of-type {
    left: 50px;
  }

  .story-top:last-of-type {
    right: 50px;
  }

  .center-line {
    border-right: 1px solid ${hawkesBlue};
    width: 50%;
    height: 60px;
  }

  .border {
    width: 115px;
    height: 115px;
    border: 1px solid ${hawkesBlue};
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
    margin: 0 auto;    
    font-family: ${secondaryFont};
    font-weight: 300;
    font-size: 22px;
    padding-top: 50px;
    width: 80%;
  }

  .author {
    display: block;
    padding-top: 20px;
    color: ${astronaut};
    text-transform: uppercase;
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 2px;
  }
`;
