import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, romance, shadows } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

export default css`

  .root {
    display: flex;
    flex-direction: row;
    margin: 0 25px;
    background-color: ${romance};
    font-family: ${primaryFont};
    justify-content: space-between;
  }

  .left {
    flex: 2;
  }

  .title-container {
    display: block;
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
    padding: 25px 0;
  }

  .icon-line-horz {
    display: block;
    text-align: center;
    padding: 5px 0;
    border-bottom: 1px solid ${shadows};
    font-size: 10px;
    font-family: ${primaryFont};
    text-transform: uppercase;
    font-weight: bold;
  }

  .icon {
    margin: 0 auto;
  }

  .gravity-label {
    flex: 0 100%;
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    color: ${astronaut};
    border-right: 1px solid ${shadows};
  }


  .star {
    margin-right: 15px;
  }

  .gravity-text {
    font-size: 10px;
    text-transform: uppercase;
    color: ${astronaut};
  }

  .gravity-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
  }

  .member-info {
    display: flex;
    flex-direction: row;
    font-family: ${primaryFont};
    font-weight: bold;
    font-size: 10px;
    justify-content: space-between;
    height: 35px;
    align-items: center;
  }

  .host-name {
    display: block;
    font-size: 20px;
    color: ${astronaut};
    font-family: ${secondaryFont};
    padding: 5px 0;
  }

  .icon-container-circle {
    background-color: ${romance};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .circle-icon-line {
    border: 1px solid ${shadows};
    width: 115px;
    height: 115px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-line {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    border-right: 1px solid ${shadows};
  }

  .action-area {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 25px;
  }

  @media ${screenLarge} {
    .root { margin: 25px 0 }
  }

`;
