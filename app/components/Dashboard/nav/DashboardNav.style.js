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
    font-weight: 800;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 1.5px;
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
    transition: all 0.4s ease;
  }

  .link-container {
    height: 100%;
    width: 100%;
    color: ${romance};
    transition: color 0.4s ease;
  }

  .link-container:hover {
    color: ${golda};
  }

  .link-container:hover img {
    height: 35px;
    margin: 43px 0 17px 0;
  }


  @media ${screenMedium} {
    .root {
      display: flex;
      height: 160px;
      font-size: 11px;
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
