import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    padding: 50px;
    display: flex;
    flex-direction: row;
    height: 200px;
    align-items: flex-start;
    background-color: ${romance};
    ${faintShadow}
  }
  .hub-header-icon {
    display: none;
  }

  .hub-header-title {
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 14px;
    color: ${astronaut};
    padding: 25px 0;
    font-weight: bold;
    text-transform: uppercase;
    border-bottom: 1px solid ${shadows};
  }

  .hub-header-nav {
    border-top: 1px solid ${shadows};
  }

  @media ${screenMedium} {
    .root {
      align-items: flex-start;
      padding: 0;
    }
    .hub-header-icon {
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-content: center;
      color: ${golden_yellow};
      border: 1px solid ${shadows};
    }

    .hub-header-title {
      height: 100px;
      font-size: 29px;
      padding: 0;
      padding-left: 50px;
      border: 1px solid ${shadows};
      border-left: 0;
    }
  }

`;
