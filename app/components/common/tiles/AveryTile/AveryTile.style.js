import css from 'styled-jsx/css';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { faintShadow } from 'styles/variables/shadows';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';

export default css`

  .root {
    display: flex;
    flex-direction: column;
    justify-content: center;
    ${faintShadow}
    font-family: ${primaryFont};
    width: 300px;
    height: 200px;
    color: ${astronaut};
    text-align: center;
    background-color: ${romance};
  }

  .inner-container {
    margin: 5px;
    box-sizing: border-box;
    display: flex;
    height: 100%;
    flex-direction: column;
    border: 1px solid ${shadows};
  }

  .title-text {
    font-family: ${secondaryFont};
    color: ${astronaut};
    font-size: 20px;
    padding-bottom: 25px;
  }


  .avatar-line {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 50%;
    border-right: 1px solid ${shadows};
  }

  .avatar-circle {
    position: absolute;
    border: 1px solid ${shadows};
    background-color: ${romance};
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .avatar-container {
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex: 1 1 0;
  }

  .avatar-img {
    position: relative;
  }

`;
