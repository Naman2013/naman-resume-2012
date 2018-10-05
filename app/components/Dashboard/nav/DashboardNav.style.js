import css from 'styled-jsx/css';
import { faintShadow } from 'styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'styles/variables/fonts';
import { screenMedium, screenLarge } from 'styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'styles/mixins/utilities';

export default css`
  .root {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 40px 40px -7px rgba(0,0,0,0.3);
    height: 100%;
    width: 100%;
    font-weight: 400;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1px;
    color: white;
    display: none;
    justify-content: space-evenly;
    transition: height ease-in-out 0.3s;
  }
  .dash-nav-item {
    text-align: center;
    height: 100%;
    width: 17%;
  }
  .dash-nav-item + .dash-nav-item {
    border-left: solid 2px #171F29;
  }
  .dash-nav-item img {
    height: 30px;
    margin: 50px 0 30px 0;
  }

  .link-container {
    height: 100%;
    width: 100%;
  }

  .dash-nav-item .title-item {
    color: ${romance};
    text-transform: uppercase;
  }
  .dash-nav-item .title-item:hover {
    font-weight: 600;
    cursor: pointer;
    color: ${romance};
    text-transform: uppercase;
  }

  @media ${screenMedium} {
    .root {
      display: flex;
      height: 115px;
      font-size: 9px;
    }
    .dash-nav-item img {
      height: 22px;
      margin: 30px 0 20px 0;
    }
  }
  @media ${screenLarge} {
    .root {
      display: flex;
    }
  }

`;
