import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from 'app/styles/variables/fonts';
import {
  lightHeadedAstronaut,
  hawkesBlue,
} from 'app/styles/variables/colors_tiles_v4';

export default css`
  .moonlight-conditions {
    padding: 0;
    list-style-type: none;
    color: ${lightHeadedAstronaut};
    padding: 0 40px 0 40px;
  }

  .moonlight-condition {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${hawkesBlue};
    padding-bottom: 30px;
    padding-top: 20px;
  }

  .object-coin {
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .moonlight-title {
    font-family: ${primaryFont};
    font-weight: 600;
    font-size: 11px;
    text-transform: uppercase;
  }

  .datum {
    font-family: ${secondaryFont};
    font-size: 20px;
  }

  .actions {
    padding: 40px;
    padding-top: 20px;
  }
`;
