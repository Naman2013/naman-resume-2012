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
    width: 280px;
    height: 200px;
    color: ${astronaut};
    text-align: center;
    background-color: ${romance};
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
    height: 50px;
    border-right: 1px solid ${shadows};
  }

  .avatar-container {
    position: relative;
    height: 100%;
  }

  .avatar-img {
    margin: 25px auto;
    position: relative;
    z-index: 1;
  }

`;
