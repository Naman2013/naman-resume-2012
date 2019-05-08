import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import { astronaut, romance, golden_yellow, shadows } from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import { backgroundImageCover, dropShadowContainer } from 'app/styles/mixins/utilities';

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
  .container {
    width: 85%;
    max-width: 962px;
    height: 0;
    padding-top: 48%;
    position: relative;
    margin: 0 auto;
  }

  svg {
      position: absolute;
      top: 3.5%;
      left: 0;
  }

  .moon {
      position: absolute;
      top: 49.5%;
      left: 37.5%;
      display: block;
      width: 25%;
      height: 45%;
      max-width: 237px;
      max-height: 242px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
  }

  .moon_vid {
      width: 128%;
      height: 128%;
      margin-top: -14%;
      margin-left: -14%;
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

  @media only screen and (min-width: 1170px) {
    .moon {
        top: 274px
    }
  }

`;
