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
    height: 55px;
    border-right: 1px solid ${shadows};
  }

  .avatar-circle {
    display: block;
    border: 1px solid #ced2d8;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: -56px;
  }

  .avatar-container {
    position: relative;
    height: 100%;
    width: 100%;
    flex: 1 1 0;
  }

  .avatar-img {
    margin: 60px auto 0 auto;
    position: relative;
    z-index: 1;
  }

`;
