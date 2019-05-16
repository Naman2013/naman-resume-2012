import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  romance,
  golden_yellow,
  shadows,
  golda
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenMedium, screenLarge } from 'app/styles/variables/breakpoints';
import {
  backgroundImageCover,
  dropShadowContainer,
} from 'app/styles/mixins/utilities';

export default css`
  .root {
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 40px 40px -7px rgba(0, 0, 0, 0.3);
    height: 100%;
    width: 100%;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 12px;
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
    border-left: solid 2px #171f29;
  }
  .dash-nav-item img {
    height: 30px;
    margin: 45px 0 30px 0;
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
    font-weight: 800;
    cursor: pointer;
    color: ${golda};
    text-transform: uppercase;
  }

  @media ${screenMedium} {
    .root {
      display: flex;
      height: 160px;
      font-size: 12px;
    }
    .dash-nav-item img {
      height: 30px;
      margin: 45px 0 20px 0;
    }
  }
  @media ${screenLarge} {
    .root {
      display: flex;
    }
  }
`;
