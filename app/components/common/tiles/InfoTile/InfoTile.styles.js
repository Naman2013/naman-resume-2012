import css from 'styled-jsx/css';
import { primaryFont, secondaryFont } from '../../../../styles/variables/fonts';
import {
  romance,
  lightHeadedAstronaut,
  hawkesBlue,
  raven,
} from '../../../../styles/variables/colors_tiles_v4';

export default css`
  .info-tile-root {
    position: relative;
    background-color: ${romance};
    width: 100%;
    box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
    padding: 40px 50px 20px;
  }

  .subject {
    font-family: ${primaryFont};
    font-size: 10px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: ${lightHeadedAstronaut};
    border-bottom: 1px solid ${hawkesBlue};
    padding-botoom: 15px;
  }

  .title {
    font-family: ${secondaryFont};
    font-size: 24px;
    font-weight: 400;
    line-height: 62px;
    text-transform: none;
    color: ${lightHeadedAstronaut};
    margin-top: 5px;
  }

  .text {
    font-family: ${secondaryFont};
    font-size: 19px;
    font-weight: 400;
    line-height: 29px;
    text-transform: none;
    color: ${raven};
  }
`;
