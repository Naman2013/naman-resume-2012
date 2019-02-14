import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, seashell, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 75px;
    border: 1px solid ${shadows};
    margin: 15px 0;
    cursor: pointer;
    color: ${astronaut};
    background-color: ${romance}
  }

  .root.is-active {
    color: ${romance};
    background-color: ${astronaut}
  }

  .half-width {
    width: 100%;
  }

  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    height: 75px;
    width: 100px;
  }

  .right {
    flex: 0 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .title-character {
    font-family: ${secondaryFont};
    font-size: 18px;
  }
  .status {
    font-size: 10px;
    color: ${astronaut};
    font-weight: bold;
    font-family: ${primaryFont};
    text-transform: uppercase;
    padding: 0;
  }

  .root.is-active .status {
    color: ${romance};
  }

  @media ${screenMedium} {
    .right {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .status {
      padding: 0 10px;
    }

    .half-width {
      width: 48%;
    }
  }

`;
