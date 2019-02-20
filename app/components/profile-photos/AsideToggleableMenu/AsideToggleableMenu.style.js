import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../styles/variables/fonts';
import { screenMedium, screenLarge } from '../../../styles/variables/breakpoints';
import { romance, hawkesBlue, shadows, lightHeadedAstronaut } from '../../../styles/variables/colors_tiles_v4';

export default css`
  .root {
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background-color: ${romance};
    display: flex;
    flex-flow: column;
    color: ${lightHeadedAstronaut};
    font-family: ${primaryFont};
    font-size: 11px;
    text-transform: uppercase;
    overflow: hidden;
    transition: width 0.3s;
    transition-timing-function: ease-out;
  }

  .heading {
    height: 16.66%;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    border-bottom: 1px solid ${shadows};
  }

  .options-list {
    display: flex;
    flex: 1;
    flex-flow: column;
    align-items: center;
  }

  .option-wrapper:hover {
    background-color: lightgrey;
  }

  .option {
    height: 20%;
    width: 90%;
    display: flex;
    align-items: center;
    
    background: transparent;
    border: none;
    border-bottom: 1px solid #d5d8dd;
    text-transform: uppercase;
    white-space: nowrap;
  }
`;
