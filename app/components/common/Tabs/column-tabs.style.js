import css from 'styled-jsx/css';
import {
  astronaut,
  hawkesBlue,
  lightHeadedAstronaut,
  moodyBleu,
} from 'app/styles/variables/colors_tiles_v4';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import { screenLarge } from 'app/styles/variables/breakpoints';

export default css`
  .menu-title {
    font-family: ${secondaryFont};
    font-weight: normal;
    color: ${astronaut};
    font-size: 30px;
    margin: 30px 0;
    margin-top: 40px;
    display: none;
  }

  .column-tab-set {
    margin: 0;
    padding: 0;
    display: flex;
    align-content: stretch;
    list-style-type: none;
    border-top: 1px solid ${hawkesBlue};
  }

  .column-tab {
    display: inline-block;
    flex: 1 100%;
    border-right: 1px solid ${hawkesBlue};
  }

  .column-tab:last-child {
    border-right: none;
  }

  .column-tab-button {
    text-transform: uppercase;
    font-family: ${primaryFont};
    color: ${moodyBleu};
    font-size: 12px;
    font-weight: 600;
    padding: 15px 0;
    border: none;
    width: 100%;
    background: none;
    cursor: pointer;
  }

  .column-tab-button.active {
    color: ${lightHeadedAstronaut};
  }

  .column-tab-button:focus {
    outline: none;
  }

  @media ${screenLarge} {
    .tabs-root {
      width: 300px;
    }
    .menu-title {
      display: block;
    }

    .column-tab-set {
      border-bottom: 1px solid ${hawkesBlue};
      padding: 15px 0;
      padding-bottom: 0;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .column-tab {
      border: none;
    }

    .column-tab-button {
      margin: 0;
      padding: 0;
      padding-bottom: 20px;
      width: auto;
    }

    .column-tab-button.active {
      border-bottom: 2px solid ${astronaut};
    }
  }
`;
