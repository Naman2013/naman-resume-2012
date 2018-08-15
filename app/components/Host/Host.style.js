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

  .icon-background {
    position: absolute;
    margin: 0 auto;
    height: 105px;
    width: 105px;
    border-radius: 50%;

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

  .flex-item {
    flex: 0 50%;
  }

  .gravity-label {
    flex: 0 100%;
    display: block;
    border-right: 1px solid ${astronaut};
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
