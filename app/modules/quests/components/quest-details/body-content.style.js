import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'app/styles/variables/colors';
import { primaryFont } from '../../../../styles/variables/fonts';
import {
  screenMedium,
  screenLarge,
  screenXLarge,
} from '../../../../styles/variables/breakpoints';
import { astronaut } from '../../../../styles/variables/colors_tiles_v4';

export default css`
  .root {
    color: ${astronaut};
    font-family: ${primaryFont};
    padding: 0 35px;
    padding-bottom: 35px;
  }

  .quest-content-buttons-container {
    display: flex;
    flex-direction: row;
  }

  .download-quest-pdf {
    display: flex;
    align-items: center;
    margin-top: 20px;
  }

  .download-quest-pdf .download {
    width: 40px;
    height: 40px;
    text-align: center;
    font-size: 18px;
    border: 1px dashed ${lightHeadedAstronaut};
    border-radius: 50%;
    padding-top: 7px;
    cursor: pointer;
  }

  .download-quest-pdf .download .icon-download:before {
    font-weight: 700 !important;
    line-height: 22px;
    font-size: 18px;
  }

  .title {
    margin: 0;
    padding: 26px 0;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
  }

  @media ${screenMedium} {
    .root {
      padding: 0 55px;
      padding-bottom: 55px;
      margin-top: -20px;
    }

    .title {
      padding-top: 60px;
      padding-bottom: 30px;
    }
  }

  @media ${screenLarge} {
    .root {
      padding: 0 75px;
      padding-bottom: 75px;
      min-height: 400px;
    }
  }

  @media ${screenXLarge} {
    .root {
      padding: 0 95px;
      padding-bottom: 95px;
    }
  }
`;
