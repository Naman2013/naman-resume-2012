import css from 'styled-jsx/css';
import { lightHeadedAstronaut } from 'app/styles/variables/colors';
import {
  screenMedium,
  screenLarge,
} from '../../../../styles/variables/breakpoints';

export default css`
  .root {
    margin: 0;
    padding: 0 35px;
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

  @media ${screenMedium} {
    .root {
      padding: 0;
      margin-top: -10px;
    }
  }

  @media ${screenLarge} {
    .root {
      width: 78%;
      margin-top: 65px;
    }
  }
`;
