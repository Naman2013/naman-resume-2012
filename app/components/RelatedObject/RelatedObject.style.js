import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`

  .root {
    margin: 25px;
    ${faintShadow}
    background-color: ${romance};
  }
  .title-container {
    text-transform: uppercase;
    color: ${astronaut};
    font-weight: bold;
    font-size: 12px;
    border-bottom: 4px solid ${astronaut};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 25px 15px;;
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

  .info-container {
    display: flex;
    flex-direction: column;
    padding: 25px;
    flex-wrap: wrap;
  }

  .icon-container {
    position: relative;
    padding: 15% 0;
    height: 200px;
  }

  .info-list {
    font-family: ${primaryFont};
    color: ${astronaut};
    display: flex;
    flex-direction: column;
  }

  .info-list-item {
    border-top: 1px solid ${shadows};
    border-bottom: 1px solid ${shadows};
    padding: 10px;
  }

  .flex-item {
    flex: 0 50%;
  }

  .object-name {
    color: ${astronaut};
    font-family: ${secondaryFont};
    font-size: 20px;
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
