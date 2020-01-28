import css from 'styled-jsx/css';
import { faintShadow } from 'app/styles/variables/shadows';
import {
  astronaut,
  golden_yellow,
  shadows,
  seashell,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont } from 'app/styles/variables/fonts';
import { screenMedium } from 'app/styles/variables/breakpoints';

export default css`
  .root {
    font-family: ${primaryFont};
    padding: 50px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    background-color: ${seashell};
    ${faintShadow}
  }

  .root.profile {
    padding: 20px 0;
    background: transparent;
    box-shadow: none;
  }

  .root.profile .hub-header-title-container {
    height: 62px;
    padding-left: 0;
    border: none;
  }

  .root.profile .hub-header-title {
    font: 400 14px ${primaryFont};
    letter-spacing: 0.6px;
    color: #648282;
  }

  .hub-header-icon {
    display: none;
  }

  .hub-header-title-container {
    flex: 1;
    width: 100%;
    padding: 25px 0;
    border-bottom: 1px solid ${shadows};
    display: flex;
  }

  .hub-header-title {
    display: flex;
    flex: 0 75%;
    align-items: center;
    font-size: 14px;
    color: ${astronaut};
    font-weight: bold;
    text-transform: uppercase;
  }

  .hub-header-nav {
    width: 100%;
    border: 0;
  }

  .right-menu-nav {
    margin-left: 28px;
    flex: 0 25%;
    display: flex;
    justify-content: flex-end;
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

    .hub-header-title-container {
      flex: 1;
      height: 100px;
      font-size: 29px;
      padding: 0;
      display: flex;
      align-items: center;
      flex: 1;
      padding-left: 50px;
      border: 1px solid ${shadows};
      border-left: 0;
    }

    .hub-header-title {
      font-size: 29px;
    }

    .hub-header-nav {
      width: 100%;
    }

    .right-menu-nav {
      margin-left: 0;
    }

    .root.profile .hub-header-title-container {
      border: none;
    }

    .root.profile .hub-header-title {
      font: 400 14px ${primaryFont};
      letter-spacing: 0.6px;
      color: #648282;
    }
  }
`;
