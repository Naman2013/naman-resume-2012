import css from 'styled-jsx/css';
import { hawkesBlue, lightHeadedAstronaut, moodyBleu } from 'styles/variables/colors_tiles_v4';
import { primaryFont } from 'styles/variables/fonts';

export default css`
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
    font-family: ${primaryFont};
    color: ${moodyBleu};
    font-size: 14px;
    font-weight: bold;
    padding: 15px 0;
    border: none;
    background: none;
    width: 100%;
    cursor: pointer;
  }

  .column-tab-button.active {
    color: ${lightHeadedAstronaut};
  }

  .column-tab-button:focus { outline: none; }
`;
